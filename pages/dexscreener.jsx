import React, { useEffect } from "react";

export default function dexscreener() {
  const data = [];

  const NFT1 = [
    {
      address: "0xc844b9c517c521f745384f2404449fd92b2de152",
      tokenValue: 1.938897186,
    },
    {
      address: "0xb708e738dc11266e37e71d9c33df257470e03d7a",
      tokenValue: 1.922526117,
    },
    {
      address: "0x2e7d531d0cc2b1da738f6018bf597829afa9219b",
      tokenValue: 1.779288992,
    },
    {
      address: "0xba1a3bd0690f04680d87e42ada32f534314871ba",
      tokenValue: 1.6737914059999999,
    },
    {
      address: "0xeccb9b9c6fb7590a4d0588953b3170a1a84e3341",
      tokenValue: 1.585118895,
    },
    {
      address: "0xcf036e0df73cb7fe6abd9358dbb475f4c1993433",
      tokenValue: 1.402463218,
    },
    {
      address: "0xe3b5d677199000d6f2d71bf9dd78a2c86029fca5",
      tokenValue: 2.223210286,
    },
    {
      address: "0xec4acd46a9adec6223e47dd02520921b64a29938",
      tokenValue: 1.668081339,
    },
  ];

  const NFT2 = [
    {
      address: "0x4ea2e907d9c61fc569d9dd394320c18ec1f7e507",
      tokenValue: 2.745486282,
    },
    {
      address: "0x4b12435d43010972915cbf7daafe0d1785160313",
      tokenValue: 2.718822269,
    },
    {
      address: "0x6f5563181bac2a019223b6908877ff4a9a71ebac",
      tokenValue: 2.471072535,
    },
    {
      address: "0xde9f9bdff3031fed70c40a5df459cd28febac473",
      tokenValue: 2.002956077,
    },
    {
      address: "0xa54cf8845ab2f560bf9aeb6e2d1648a69d4c6529",
      tokenValue: 2.8470465050000007,
    },
    {
      address: "0x5818a37eb2cdeef046462397a7086a046bcb49f2",
      tokenValue: 2.772983388,
    },
  ];

  const NFT3 = [
    {
      address: "0x88e88b96d549e0497c6003d5ebf8e013df806ebf",
      tokenValue: 53.72807053,
    },
    {
      address: "0xb6ee97116e48fa293c327e627268e25ebfdabf3d",
      tokenValue: 35.07574249,
    },
    {
      address: "0xa68a860c69b1d4c1a6bba5c03a2d60fb37b8ad15",
      tokenValue: 21.10544537,
    },
    {
      address: "0x4bb7fba588b4254536de4316e8fb346bbe275ecb",
      tokenValue: 14.088504906999999,
    },
    {
      address: "0x94f5ddf5150c04f3be316b1e406faf923de8b15a",
      tokenValue: 13.382697975,
    },
    {
      address: "0xc40c3b3d3a558ce523dea0b5f1acda20b3f4c310",
      tokenValue: 11.772187692000001,
    },
    {
      address: "0x9b8bcd440a5057bc2cbabef107779ebb58ae3c99",
      tokenValue: 11.56681372,
    },
    {
      address: "0x8d5aa0bcf33d2269ec300fd7b1285032197f2c98",
      tokenValue: 9.377221747,
    },
    {
      address: "0xf1faff2c2dbce708e982ad407245cb6259d9cfeb",
      tokenValue: 7.683911228,
    },
    {
      address: "0x3f9c0416edc8a5c02061a7a8c2fbf8ee84fb4706",
      tokenValue: 6.958418378,
    },
    {
      address: "0x796a282a6e601af32a5c1e6cc63dfbe5f46d55bd",
      tokenValue: 6.52824262,
    },
    {
      address: "0xfe49a30c811c1fd5a716068710930cfea0eac20b",
      tokenValue: 6.359977284999999,
    },
    {
      address: "0xa54cf8845ab2f560bf9aeb6e2d1648a69d4c6529",
      tokenValue: 6.151312094000002,
    },
    {
      address: "0xcf1d714e94f36c3a5248d09b4ffb9d7a8da0e862",
      tokenValue: 5.968303518,
    },
    {
      address: "0xdfcec744c8417d2a0ef72fe520438dd20f368369",
      tokenValue: 4.472285726,
    },
    {
      address: "0x1a4446c2ffb3d6cf2adfe96d26cc9f326df881e1",
      tokenValue: 4.316567127000001,
    },
    {
      address: "0xef0db78bcdc50651864b71e6324b08569477b80a",
      tokenValue: 3.884957971,
    },
    {
      address: "0x9d2699358b4111eb4f8a2901d2f68c3c0cb2aeae",
      tokenValue: 3.680853213,
    },
    {
      address: "0x74cbc55f2292f8ce097fce80e3a8d0833655adb8",
      tokenValue: 3.331830471,
    },
    {
      address: "0x4d9b06250b0202ae5eb20ba31f35635f1f413635",
      tokenValue: 3.112619574,
    },
    {
      address: "0xe4ab985e3ccb5528343086b478fe4d67853d81c4",
      tokenValue: 3.0746429470000005,
    },
    {
      address: "0xb8eacbdf56283f8f86cc3afc7c8fe08315516183",
      tokenValue: 19.782945963,
    },
    {
      address: "0x566a4001efadd4d0d5e46cbb663c403a2e9c23c3",
      tokenValue: 19.47858788,
    },
    {
      address: "0x796a282a6e601af32a5c1e6cc63dfbe5f46d55bd",
      tokenValue: 4.167534577,
    },
    {
      address: "0x98be2f963343fa37b324070984ffd72b0460edbe",
      tokenValue: 3.643463032,
    },
    {
      address: "0xc40c3b3d3a558ce523dea0b5f1acda20b3f4c310",
      tokenValue: 3.1241076200000006,
    },
    {
      address: "0xfe49a30c811c1fd5a716068710930cfea0eac20b",
      tokenValue: 3.1079208529999995,
    },
  ];

  useEffect(() => {
    async function init() {
      let inArray = [];
      let outArray = [];
      await data.map((item) => {
        if (
          item[9] === "Cake-LP" &&
          item[3] === "0x3eab0c9716b0aa98cdc4c3ae317d69de301ef247"
        ) {
          const txout = {
            UnixTimestamp: item[1],
            DateTime: item[2],
            From: item[3],
            To: item[4],
            TokenValue: item[5],
            USDValueDayOfTx: item[6],
            ContractAddress: item[7],
            TokenName: item[8],
            TokenSymbol: item[9],
          };
          outArray.push(txout);
        }

        if (
          item[9] === "Cake-LP" &&
          item[4] === "0x3eab0c9716b0aa98cdc4c3ae317d69de301ef247"
        ) {
          const txin = {
            UnixTimestamp: item[1],
            DateTime: item[2],
            From: item[3],
            To: item[4],
            TokenValue: item[5],
            USDValueDayOfTx: item[6],
            ContractAddress: item[7],
            TokenName: item[8],
            TokenSymbol: item[9],
          };
          inArray.push(txin);
        }
      });

      const sumByMakerOut = NFT1.reduce((acc, transaction) => {
        const { address } = transaction;
        if (!acc[address]) {
          acc[address] = 1;
        }
        // acc[To] += parseFloat(TokenValue);
        return acc;
      }, {});

      const sumByMakerIn = NFT2.reduce((acc, transaction) => {
        const { address } = transaction;
        if (!acc[address]) {
          acc[address] = 2;
        }
        return acc;
      }, {});

      const sumByMakerIn3 = NFT3.reduce((acc, transaction) => {
        const { address } = transaction;
        if (!acc[address]) {
          acc[address] = 3;
        }
        return acc;
      }, {});

      const outResult = await Object.entries(sumByMakerOut).map(
        ([maker, sum]) => ({
          maker,
          sum,
        })
      );

      const inResult = await Object.entries(sumByMakerIn).map(
        ([maker, sum]) => ({
          maker,
          sum,
        })
      );

      const inResult3 = await Object.entries(sumByMakerIn3).map(
        ([maker, sum]) => ({
          maker,
          sum,
        })
      );

      const array = outResult.concat(inResult);
      const newArray = array.concat(inResult3);

      const results = newArray.reduce((acc, transaction) => {
        const { maker, sum } = transaction;
        if (!acc[maker]) {
          acc[maker] = Number(sum);
        } else {
          acc[maker] += Number(sum);
        }
        return acc;
      }, {});

      // console.log(newArray);

      let total = 0;

      const resultsddd = await Object.entries(results).map(([maker, summ]) => {
        const sum = summ > 3 ? 3 : summ;
        total += sum;
        return { maker, sum };
      });

      // async function decreaseSum(inResult, outResult) {
      //   let newArray = [];

      //   await inResult.forEach(async (inO) => {
      //     // Find the corresponding object in the resultArray
      //     const match = await outResult.find((out) => inO.maker === out.maker);
      //     if (match) {
      //       newArray.push({ address: inO.maker, sum: 3 });
      //     }
      //     newArray.push({ address: inO.maker, sum: 1 });
      //   });

      //   return newArray;
      // }

      // const res = await decreaseSum(inResult, outResult);

      //   console.log(JSON.stringify(outResult));
      //   console.log(JSON.stringify(inResult));
      console.log(
        JSON.stringify(resultsddd.sort((a, b) => a.sum - b.sum)),
        resultsddd
      );
    }
    init();
  }, []);

  const NFTs = [
    { address: "0xc844b9c517c521f745384f2404449fd92b2de152", NFT: 1 },
    { address: "0xb708e738dc11266e37e71d9c33df257470e03d7a", NFT: 1 },
    { address: "0x2e7d531d0cc2b1da738f6018bf597829afa9219b", NFT: 1 },
    { address: "0xba1a3bd0690f04680d87e42ada32f534314871ba", NFT: 1 },
    { address: "0xeccb9b9c6fb7590a4d0588953b3170a1a84e3341", NFT: 1 },
    { address: "0xcf036e0df73cb7fe6abd9358dbb475f4c1993433", NFT: 1 },
    { address: "0xe3b5d677199000d6f2d71bf9dd78a2c86029fca5", NFT: 1 },
    { address: "0xec4acd46a9adec6223e47dd02520921b64a29938", NFT: 1 },
    { address: "0x4ea2e907d9c61fc569d9dd394320c18ec1f7e507", NFT: 2 },
    { address: "0x4b12435d43010972915cbf7daafe0d1785160313", NFT: 2 },
    { address: "0x6f5563181bac2a019223b6908877ff4a9a71ebac", NFT: 2 },
    { address: "0xde9f9bdff3031fed70c40a5df459cd28febac473", NFT: 2 },
    { address: "0x5818a37eb2cdeef046462397a7086a046bcb49f2", NFT: 2 },
    { address: "0xa54cf8845ab2f560bf9aeb6e2d1648a69d4c6529", NFT: 3 },
    { address: "0x88e88b96d549e0497c6003d5ebf8e013df806ebf", NFT: 3 },
    { address: "0xb6ee97116e48fa293c327e627268e25ebfdabf3d", NFT: 3 },
    { address: "0xa68a860c69b1d4c1a6bba5c03a2d60fb37b8ad15", NFT: 3 },
    { address: "0x4bb7fba588b4254536de4316e8fb346bbe275ecb", NFT: 3 },
    { address: "0x94f5ddf5150c04f3be316b1e406faf923de8b15a", NFT: 3 },
    { address: "0xc40c3b3d3a558ce523dea0b5f1acda20b3f4c310", NFT: 3 },
    { address: "0x9b8bcd440a5057bc2cbabef107779ebb58ae3c99", NFT: 3 },
    { address: "0x8d5aa0bcf33d2269ec300fd7b1285032197f2c98", NFT: 3 },
    { address: "0xf1faff2c2dbce708e982ad407245cb6259d9cfeb", NFT: 3 },
    { address: "0x3f9c0416edc8a5c02061a7a8c2fbf8ee84fb4706", NFT: 3 },
    { address: "0x796a282a6e601af32a5c1e6cc63dfbe5f46d55bd", NFT: 3 },
    { address: "0xfe49a30c811c1fd5a716068710930cfea0eac20b", NFT: 3 },
    { address: "0xcf1d714e94f36c3a5248d09b4ffb9d7a8da0e862", NFT: 3 },
    { address: "0xdfcec744c8417d2a0ef72fe520438dd20f368369", NFT: 3 },
    { address: "0x1a4446c2ffb3d6cf2adfe96d26cc9f326df881e1", NFT: 3 },
    { address: "0xef0db78bcdc50651864b71e6324b08569477b80a", NFT: 3 },
    { address: "0x9d2699358b4111eb4f8a2901d2f68c3c0cb2aeae", NFT: 3 },
    { address: "0x74cbc55f2292f8ce097fce80e3a8d0833655adb8", NFT: 3 },
    { address: "0x4d9b06250b0202ae5eb20ba31f35635f1f413635", NFT: 3 },
    { address: "0xe4ab985e3ccb5528343086b478fe4d67853d81c4", NFT: 3 },
    { address: "0xb8eacbdf56283f8f86cc3afc7c8fe08315516183", NFT: 3 },
    { address: "0x566a4001efadd4d0d5e46cbb663c403a2e9c23c3", NFT: 3 },
    { address: "0x98be2f963343fa37b324070984ffd72b0460edbe", NFT: 3 },
  ];

  return (
    <div>
      <ul>asfasdf</ul>
    </div>
  );
}
