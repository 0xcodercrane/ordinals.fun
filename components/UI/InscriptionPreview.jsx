import React, { useEffect, useState } from "react";

export default function InscriptionPreview({ content, inscription }) {
  const [transactions, setTransactions] = useState([]);

  const getData = async () => {
    const data = await fetch(
      "https://litecoinspace.org/api/v1/block/a0b929e62b3fe16130522826336b1a484f89bff3b22b6280bdcfedce080ef1f8/audit-summary"
    );

    const jsonData = await data.json();
    const txs = jsonData.transactions.filter((tx) => tx.vsize > 1000);
    //  console.log(txs);
    setTransactions(txs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full text-4xl dark:bg-primary-dark/20 bg-primary-light/10 rounded-lg p-3 flex justify-center items-center font-bold min-h-[400px] gap-1">
      {inscription?.contentType.indexOf("image") > -1 && (
        <>
          <img
            src={`https://ordinalslite.com/content/${inscription?.inscriptionId}`}
            className="w-full h-full object-contain"
            alt=""
          />
        </>
      )}

      {inscription?.contentType.indexOf("text") > -1 && (
        <>
          {content && (
            <>
              {content.indexOf("tick") > -1 ? (
                <div className="text-xl font-bold px-3">
                  {JSON.parse(content).tick}
                </div>
              ) : (
                <div className="text-xl font-bold px-3">{content}</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
