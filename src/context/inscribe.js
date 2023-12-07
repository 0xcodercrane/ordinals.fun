// Requires litecoin
const litecore = require("litecoin");

// Initialize transaction
let transaction = new litecore.Transaction();

function inscribe(
  userAddress,
  litemaps,
  devFeeAddress,
  serviceFeeAddress,
  inscribeFeeAddress
) {
  litemaps.forEach((litemap) => {
    // assuming that litemap content is in proper format, otherwise validation, serialization and formatting goes here
    const data = new Buffer.from(litemap);
    const dataScript = litecore.Script.buildDataOut(data);

    transaction.addOutput(
      new litecore.Transaction.Output({
        script: dataScript,
        satoshis: 0, // assuming your data doesn't need to carry any value
      })
    );
  });

  transaction
    .from(userInputs) // assumes you have funded Inputs
    .change(userAddress)
    .fee(feeAmount); // the hard-coded fee amount - balance will be used as change

  //spliting fee into3 addresses
  const devFee = new litecore.Unit.fromBTC(transaction._fee * 0.3).toSatoshis(); //30% going to dev fee
  const serviceFee = new litecore.Unit.fromBTC(
    transaction._fee * 0.3
  ).toSatoshis(); //30% going to service fee
  const inscribeFee = new litecore.Unit.fromBTC(
    transaction._fee * 0.4
  ).toSatoshis(); //40% going to inscribe fee

  transaction.to([
    {
      address: devFeeAddress,
      satoshis: devFee,
    },
    {
      address: serviceFeeAddress,
      satoshis: serviceFee,
    },
    {
      address: inscribeFeeAddress,
      satoshis: inscribeFee,
    },
  ]);

  // Sign the Transaction
  transaction.sign(privateKeys);

  // Serialize the Transaction to get the raw data
  const serializedTransaction = transaction.serialize();

  // Finally, broadcast the transaction to the network
  return litecoinTestnetUtils.broadcastTransaction(serializedTransaction);
}
