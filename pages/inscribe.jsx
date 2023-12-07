import InscribeCompnent from "@/components/InscribeComponent";
import Layout from "@/components/Layout";

export default function Inscribe() {

  return (
    <Layout>
      <InscribeCompnent />

      {/* {inscribeContext.minted ? (
        <Confirm text='The order is minted successfuly' status='minted' />
      ) : (
        <>
          {inscribeContext.mintFailed ? (
            <Confirm text='The order is expried' status='notPaid' />
          ) : (
            <>
              {!inscribeContext.serviceFee ? (
              ) : (
                <>
                  {inscribeContext.pendingOrder ? (
                    <WaitingPayment />
                  ) : ( */}
      {/* <CreateOrder /> */}
      {/* )}
                </>
              )}
            </>
          )}
        </>
      )} */}
    </Layout>
  );
}
