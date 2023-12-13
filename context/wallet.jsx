import React, { useEffect } from "react";
import encryptor from "browser-passworder";
import keyring from "@/services/keyring";
import openApiService from "@/services/openAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  account,
  booted,
  isUnlocked,
  vault,
  balance,
} from "../store/slices/wallet";
import { deviceId } from "../store/slices/openApi";
import randomstring from "randomstring";

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

    dispatch(account(newkeyring));
  };

  const unlockWallet = () => {
    dispatch(isUnlocked(false));
  };

  const removeWallet = () => {
    dispatch(vault(""));
    dispatch(booted({}));
  };

  const fetchbalance = async () => {
    try {
      const newBalance = await openApiService.getAddressBalance(
        accountInfo?.account?.accounts[0]?.address
      );
      dispatch(balance(newBalance));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(accountInfo);
  }, [account]);

  useEffect(() => {
    if (!apiInfo?.deviceId) {
      const randomestring = randomstring.generate(12);
      dispatch(deviceId(randomestring));
      openApiService.setDeviceId(randomestring);
    } else {
      openApiService.setDeviceId(apiInfo?.deviceId);
    }
  }, [apiInfo]);

  useEffect(() => {
    setInterval(() => {
      fetchbalance();
    }, [5000]);
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
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default Wallet;
