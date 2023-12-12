import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booted } from "@/store/slices/account";
import { WalletContext } from "../../context/wallet";

export default function WalletCreate({ setType }) {
  const walletContext = useContext(WalletContext);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [wanning, setWanning] = useState("");

  const [contextData, setConntextData] = useState({
    mnemonics: "",
    entropy: 128,
    hdPath: "",
    passphrase: "",
    addressType: 0,
    step1Completed: true,
    tabType: "STEP1",
    restoreWalletType: 0,
    isRestore: false,
    isCustom: false,
    customHdPath: "",
    addressTypeIndex: 0,
    wordsType: 0,
    hdPath: "m/84'/2'/0'/0",
  });

  const btnClick = async () => {
    try {
      const encryptBooted = walletContext.Boot(password);
      // dispatch(booted(encryptBooted));
      const mnemonic = await walletContext.generateMnemonic(
        contextData.entropy
      );
      const preMnemonics = await walletContext.encrypt(password, mnemonic);
      setConntextData((data) => ({ ...data, mnemonics: mnemonic }));
      walletContext.createAccount(
        mnemonic,
        contextData.hdPath,
        contextData.passphrase,
        contextData.addressType,
        1
      );
      // setType(4);
    } catch (error) {
      console.log("create wallet:", error);
    }
  };

  const verify = (pwd2) => {
    if (pwd2 && pwd2 !== password) {
      setWanning("Entered passwords differ");
    } else {
      setWanning("");
    }
  };

  useEffect(() => {
    setDisabled(true);

    if (password) {
      if (password.length < 5) {
        setWanning("Password must contain at least 5 characters");
        return;
      }

      if (password2) {
        if (password === password2) {
          setDisabled(false);
          return;
        }
      }

      setWanning("");
    }
  }, [password, password2]);

  const handleOnKeyUp = (e) => {
    if (!disabled && "Enter" == e.key) {
      btnClick();
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white/5 text-white backdrop-blur-xl">
      <p className="my-8 font-semibold text-center text-2xl">
        Set Your wallet password
      </p>
      <input
        type="password"
        placeholder="Enter password."
        className="mt-3 bg-transparent border border-white/20 rounded-lg w-full py-2 px-3"
        onBlur={(e) => {
          setPassword(e.target.value);
        }}
        autoFocus={true}
      />
      <input
        type="password2"
        placeholder="Confirm password."
        className="mt-3 bg-transparent border border-white/20 rounded-lg w-full py-2 px-3"
        onChange={(e) => {
          setPassword2(e.target.value);
        }}
        onBlur={(e) => {
          verify(e.target.value);
        }}
        onKeyUp={(e) => handleOnKeyUp(e)}
      />

      {wanning && <p className="text-red-500 mt-2 text-sm">{wanning}</p>}

      <div className="flex justify-between gap-3 mt-6">
        <button
          className="py-2.5 px-4 rounded-lg main_btn mx-auto w-full mt-6"
          onClick={() => setType(0)}
        >
          Go Back
        </button>
        <button
          disabled={disabled}
          className="py-2.5 px-4 rounded-lg main_btn mx-auto w-full mt-6"
          onClick={btnClick}
        >
          Set password
        </button>
      </div>
    </div>
  );
}
