import { useState } from "react";
import { useEffect } from "react";
import { useAddress } from "../store/hooks";
import openApi from "@/services/openAPI";
import { toast } from "react-hot-toast";
import { calculateFee } from "@/utils";

export default function useUTXOs() {
  const dummyUtxoValue = 3000;
  const { address } = useAddress();
  const [utxos, setUtxos] = useState([]);
  const [sortedUtxos, setSortedUtxos] = useState([]);
  const [dummyUTXOs, setDummyUTXOs] = useState([]);

  async function doesUtxoContainInscription(utxo) {
    const html = await fetch(
      `https://ordinalslite.com/output/${utxo.txid}:${utxo.vout}`
    ).then((response) => response.text());

    return html.match(/class=thumbnails/) !== null;
  }

  async function selectUtxos(utxos, amount, vins, vouts, recommendedFeeRate) {
    const selectedUtxos = [];
    let selectedAmount = 0;
    console.log(amount, recommendedFeeRate);

    // Sort descending by value, and filter out dummy utxos
    utxos = utxos
      .filter((x) => x.value > dummyUtxoValue)
      .sort((a, b) => b.value - a.value);

    // console.log(
    //   amount +
    //     dummyUtxoValue +
    //     calculateFee(vins + selectedUtxos.length, vouts, recommendedFeeRate)
    // );

    for (const utxo of utxos) {
      // Never spend a utxo that contains an inscription for cardinal purposes
      if (await doesUtxoContainInscription(utxo)) {
        continue;
      }
      selectedUtxos.push(utxo);
      selectedAmount += utxo.value;

      if (
        selectedAmount >=
        amount +
          dummyUtxoValue +
          calculateFee(vins + selectedUtxos.length, vouts, recommendedFeeRate)
      ) {
        break;
      }
    }

    if (selectedAmount < amount) {
      toast.error(`Not enough cardinal spendable funds.
            Address has:  ${satToBtc(selectedAmount)} ${coin}
            Needed:          ${satToBtc(amount)} ${coin}
            
            UTXOs:
            ${utxos.map((x) => `${x.txid}:${x.vout}`).join("\n")}`);
    }

    return selectedUtxos;
  }

  const getUTXOs = async (address) => {
    try {
      const res = await fetch(
        `https://litecoinspace.org/api/address/${address}/utxo`
      ).then((response) => response.json());
      if (res?.length > 0) {
        setUtxos(res);
        setSortedUtxos(
          res
            .filter((x) => x.value > dummyUtxoValue)
            .sort((a, b) => b.value - a.value)
        );
        setDummyUTXOs(res.filter((x) => x.value == dummyUtxoValue));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) {
      getUTXOs(address);
    }
  }, [address]);

  return {
    utxos,
    sortedUtxos,
    dummyUTXOs,
    selectUtxos: selectUtxos,
    refreshUTXOs: getUTXOs,
  };
}
