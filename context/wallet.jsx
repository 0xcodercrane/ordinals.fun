import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAddress } from "sats-connect";
import encryptor from "browser-passworder";
import * as bip39 from "bip39";
import { booted, isUnlocked, account } from "@/store/slices/account";
import keyring from "@/services/keyring";
import { useDispatch } from "react-redux";

export const WalletContext = React.createContext();

const Wallet = (props) => {
  const dispatch = useDispatch();

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

    // const displayedKeyring = await keyring.displayForKeyring(
    //   originKeyring,
    //   addressType,
    //   keyring.keyrings.length - 1
    // );
    // console.log(dispatch)
    // dispatch(account({payload: 'asdfasdf'}));
    dispatch(isUnlocked(true));
  };

  return (
    <WalletContext.Provider
      value={{
        Boot,
        generateMnemonic,
        encrypt,
        createAccount,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default Wallet;
