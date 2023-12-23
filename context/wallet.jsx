"use client";
import React, { useEffect } from "react";
import encryptor from "browser-passworder";
import keyring from "@/services/keyring";
import openApi from "@/services/openAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  account,
  booted,
  isUnlocked,
  vault,
  balance,
  setCurrentKeyRing,
  updateInscriptions
} from "../store/slices/wallet";
import { deviceId } from "../store/slices/openApi";
import randomstring from "randomstring";
import { satoshisToAmount } from "@/utils";
import {
  createSendBTC,
  createSendMultiOrds,
  createSendOrd,
  createSplitOrdUtxoV2,
} from "@unisat/ord-utils";
import { address as PsbtAddress } from "bitcoinjs-lib";
import * as bitcoin from "bitcoinjs-lib";
import { toast } from "react-hot-toast";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import { Psbt } from "bitcoinjs-lib";
bitcoin.initEccLib(ecc);
var ECPair = ECPairFactory(ecc);

export const WalletContext = React.createContext();

const Wallet = (props) => {
  const dispatch = useDispatch();
  const accountInfo = useSelector(
    (state) => state?.persistedReducer?.walletReducer?.value
  );
  const apiInfo = useSelector(
    (state) => state?.persistedReducer?.openAPIReducer.value
  );

  const Boot = async (password) => {
    const encryptBooted = await keyring.boot(password);
    return encryptBooted;
  };

  const generateMnemonic = async (value) => {
    const mnemonic = await keyring.generateMnemonic(value);
    return mnemonic;
  };

  const encrypt = async (password, mnemonic) => {
    const preMnemonics = await encryptor.encrypt(password, mnemonic);
    return preMnemonics;
  };

  const createAccount = async (
    mnemonics,
    hdPath,
    passphrase,
    addressType,
    accountCount
  ) => {
    const originKeyring = await keyring.createKeyringWithMnemonics(
      mnemonics,
      hdPath,
      passphrase,
      addressType,
      accountCount
    );

    const displayedKeyring = await keyring.displayForKeyring(
      originKeyring,
      addressType,
      keyring.keyrings.length - 1
    );

    const newkeyring = keyring.displayedKeyringToWalletKeyring(
      displayedKeyring,
      keyring.keyrings.length - 1
    );
    dispatch(setCurrentKeyRing(originKeyring));
    dispatch(account(newkeyring));
  };

  const importWallet = async (
    mnemonics,
    hdPath,
    passphrase,
    addressType,
    accountCount
  ) => {
    const originKeyring = await keyring.createKeyringWithMnemonics(
      mnemonics,
      hdPath,
      passphrase,
      addressType,
      accountCount
    );

    const displayedKeyring = await keyring.displayForKeyring(
      originKeyring,
      addressType,
      keyring.keyrings.length - 1
    );

    const newkeyring = keyring.displayedKeyringToWalletKeyring(
      displayedKeyring,
      keyring.keyrings.length - 1
    );
    dispatch(setCurrentKeyRing(originKeyring));
    dispatch(account(newkeyring));
  };

  const unlockWallet = () => {
    dispatch(isUnlocked(false));
  };

  const removeWallet = () => {
    dispatch(account({}));
    dispatch(setCurrentKeyRing({}));
    dispatch(vault(""));
    dispatch(booted({}));
  };

  const fetchbalance = async () => {
    try {
      if (accountInfo?.account) {
        const newBalance = await openApi.getAddressBalance(
          accountInfo?.account?.accounts[0]?.address
        );
        const inscriptions = await openApi.getAddressInscriptions(accountInfo?.account?.accounts[0]?.address, 0, 10);
        dispatch(updateInscriptions(inscriptions));
        dispatch(balance(newBalance));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInscriptionsById = async () => {
    
  }

  const getFeeSummary = async () => {
    const result = await openApi.getFeeSummary();
    return result;
  };

  const queryDomainInfo = async (domain) => {
    const data = await openApi.getDomainInfo(domain);
    return data;
  };

  const getInscriptionSummary = async () => {
    const data = await openApi.getInscriptionSummary();
    return data;
  };

  const getAppSummary = async () => {
    const data = await openApi.getAppSummary();
    return data;
  };

  const getAddressUtxo = async (address) => {
    const data = await openApi.getAddressUtxo(address);
    return data;
  };

  const getCurrentAccount = () => {
    const currentAccount = accountInfo?.account?.accounts[0];
    return currentAccount;
  };

  const getcurrentKeyring = () => {
    const rootPrive = accountInfo?.root?.xpriv;
    return rootPrive;
  };

  const getRootPriv = () => {
    const rootPriv = accountInfo?.keyrings?.xpriv;
    return rootPriv;
  };

  const getMnemonic = () => {
    const rootPriv = accountInfo?.keyrings?.mnemonic;
    return rootPriv;
  };

  const getPrivateKey = async () => {
    const currentAccount = await getCurrentAccount();
    const currentKeyring = await getcurrentKeyring();
    const privateKey = await currentKeyring.exportAccount(
      currentAccount.pubkey
    );
    const network = toPsbtNetwork();
    const hex = privateKey;
    const wif = ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), {
      network,
    }).toWIF();
    return {
      hex,
      wif,
    };
  };

  const toPsbtNetwork = () => {
    return {
      messagePrefix: "\x19Litecoin Signed Message:\n",
      bech32: "ltc",
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    };
  };

  const signPsbt = async (psbt, options) => {
    console.log("running sign psbt");
    const mnemonic = getMnemonic();

    const account = await getCurrentAccount();
    if (!account) console.log("no current account");

    // const currentKeyring = await getcurrentKeyring();
    // if (!currentKeyring) console.log("no current keyring");
    const psbtNetwork = toPsbtNetwork();

    const toSignInputs = [];
    psbt.data.inputs.forEach((v, index) => {
      let script = null;
      let value = 0;
      if (v.witnessUtxo) {
        script = v.witnessUtxo.script;
        value = v.witnessUtxo.value;
      } else if (v.nonWitnessUtxo) {
        const tx = bitcoin.Transaction.fromBuffer(v.nonWitnessUtxo);
        const output = tx.outs[psbt.txInputs[index].index];
        script = output.script;
        value = output.value;
      }
      const isSigned = v.finalScriptSig || v.finalScriptWitness;
      if (script && !isSigned) {
        const address = PsbtAddress.fromOutputScript(script, psbtNetwork);
        if (account.address === address) {
          toSignInputs.push({
            index,
            publicKey: account.pubkey,
            sighashTypes: v.sighashType ? [v.sighashType] : undefined,
          });
        }
      }
    });
    console.log("before:", psbt);
    psbt = await keyring.signTransaction(mnemonic, psbt, toSignInputs);
    // const validator =
    if (options && options.autoFinalized == false) {
      // do not finalize
    } else {
      console.log(toSignInputs);
      // await psbt.signInput(0, account, []);
      toSignInputs.forEach((v) => {
        //   // psbt.validateSignaturesOfInput(v.index, validator);
        psbt.finalizeInput(v.index);
      });
    }
    console.log("after:", psbt);
    return psbt;
  };

  const sendBTC = async ({ to, amount, utxos, receiverToPayFee, feeRate }) => {
    const currentAccount = accountInfo?.account?.accounts[0];
    if (!currentAccount) console.log("no current account");

    const psbtNetwork = toPsbtNetwork();

    const psbt = await createSendBTC({
      utxos: utxos.map((v) => {
        return {
          txId: v.txId,
          outputIndex: v.outputIndex,
          satoshis: v.satoshis,
          scriptPk: v.scriptPk,
          addressType: v.addressType,
          address: currentAccount.address,
          ords: v.inscriptions,
        };
      }),
      toAddress: to,
      toAmount: amount,
      wallet: { signPsbt: signPsbt },
      network: psbtNetwork,
      changeAddress: currentAccount.address,
      receiverToPayFee,
      pubkey: currentAccount.pubkey,
      feeRate,
      enableRBF: false,
    });
    console.log("finialized3333");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    psbt.__CACHE.__UNSAFE_SIGN_NONSEGWIT = false;

    console.log(psbt.toHex());
    return psbt.toHex();
  };

  const createBitcoinTx = async (
    toAddressInfo,
    toAmount,
    feeRate,
    receiverToPayFee
  ) => {
    const fromAddress = accountInfo?.account?.accounts[0]?.address;
    const utxos = await getAddressUtxo(fromAddress);

    if (utxos.length == 0) {
      toast.error("utxos fetch issue");
      return;
    }
    const safeBalance = utxos
      .filter((v) => v.inscriptions.length == 0)
      .reduce((pre, cur) => pre + cur.satoshis, 0);
    if (safeBalance < toAmount) {
      console.log(
        `Insufficient balance. Non-Inscription balance(${satoshisToAmount(
          safeBalance
        )} LTC) is lower than ${satoshisToAmount(toAmount)} LTC `
      );
    }

    if (!feeRate) {
      const summary = await getFeeSummary();
      feeRate = summary.list[1].feeRate;
    }

    console.log("finalized1");
    const psbtHex = await sendBTC({
      to: toAddressInfo.address,
      amount: toAmount,
      utxos: utxos,
      receiverToPayFee,
      feeRate,
    });

    console.log("finalized2");
    const psbt = Psbt.fromHex(psbtHex);
    const rawtx = psbt.extractTransaction().toHex();
    const fee = psbt.getFee();
    const rawTxInfo = {
      psbtHex,
      rawtx,
      toAddressInfo,
      fee,
    };
    console.log("rawTxInfo:", rawtx);
    return rawtx;
  };

  const pushTx = async (rawTxInfo) => {
    await openApi.pushTx(rawTxInfo);
    fetchbalance();
  };

  // useEffect(() => {
  //   console.log("---------current Key ring-------------");
  //   console.log(accountInfo);
  //   console.log("---------current Key ring-------------");
  // }, [accountInfo]);

  useEffect(() => {
    if (!apiInfo?.deviceId) {
      const randomestring = randomstring.generate(12);
      dispatch(deviceId(randomestring));
      openApi.setDeviceId(randomestring);
    } else {
      openApi.setDeviceId(apiInfo?.deviceId);
    }
  }, [apiInfo]);

  useEffect(() => {
    fetchbalance();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        Boot,
        generateMnemonic,
        encrypt,
        createAccount,
        unlockWallet,
        removeWallet,
        fetchbalance,
        getFeeSummary,
        queryDomainInfo,
        getInscriptionSummary,
        getAppSummary,
        getAddressUtxo,
        createBitcoinTx,
        sendBTC,
        pushTx,
        importWallet,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default Wallet;
