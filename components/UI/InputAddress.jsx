import React from "react";
import styles from "@/styles/inscribe.module.css";
import { validate } from "bitcoin-address-validation";
import { useState } from "react";
import { useEffect } from "react";
import AddressCheck from "@/components/AddressCheck";

export default function InputAddress() {
  const [receiveAddress, setReceiveAddress] = useState("");
  const [isValidAddress, setIsvalidAddress] = useState(false);
  const [loading, setLoading] = useState({
    address: false,
  });

  const checkAddress = () => {
    setIsvalidAddress(validate(receiveAddress));
    setLoading({
      ...loading,
      address: false,
    });
  };

  useEffect(() => {
    if (receiveAddress) {
      setLoading({
        ...loading,
        address: true,
      });
      setIsvalidAddress(false);
      const delayDebounceFn = setTimeout(() => {
        checkAddress();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveAddress]);

  return (
    <>
    <p className="mt-3">Input the receive address:</p>
    <div className="mt-2 w-full border border-white/50 rounded-md flex gap-2">
      <input
        type="text"
        name="address"
        id="address"
        className="px-3 py-2 bg-transparent rounded-lg w-full focus:outline-none"
        placeholder="Provide the address to receive the inscription(s). (Optional)"
        value={receiveAddress}
        onChange={(e) => setReceiveAddress(e.target.value)}
      />
      <AddressCheck
        loading={loading}
        receiveAddress={receiveAddress}
        isValidAddress={isValidAddress}
      />
    </div>    
    </>

  );
}
