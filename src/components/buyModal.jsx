import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function BuyModal({ modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p className="text-3xl font-bold text-center mb-3">Buy LiteMap</p>
      <img
        src="https://img-cdn.magiceden.dev/rs:fit:800:0:0/plain/https://bitmap-img.magiceden.dev/v1/d1ae814fa7c62782bc43968293022854119dd6afa9d886f80c3d407f71652d09i0"
        className="object-cover p-2 max-h-[250px] mx-auto"
        alt=""
      />
      <div className="p-3">
        <div className="my-3">
          <div className="flex justify-between gap-6 text-lg">
            <div className="flex justify-end w-full">Taker fee (2.8%):</div>
            <div className="w-full flex items-center gap-2">
              0.17 <span className="text-sm text-gray-300"> ($0.014)</span>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-lg">
            <div className="flex justify-end w-full">Network fee:</div>
            <div className="w-full flex items-center gap-2">
              ≈0.49{" "}
              <spa className="text-sm text-gray-300" n>
                {" "}
                ($0.04)
              </spa>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-lg mt-3">
            <div className="flex justify-end w-full">Total:</div>
            <div className="w-full flex items-center gap-2">
              6.64{" "}
              <spa className="text-sm text-gray-300" n>
                {" "}
                ($0.54)
              </spa>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-lg">
            <div className="flex justify-end w-full">Available balance:</div>
            <div className="w-full flex items-center gap-2">
              35.19{" "}
              <spa className="text-sm text-gray-300" n>
                {" "}
                ($2.87)
              </spa>
            </div>
          </div>
        </div>

        <button className="py-2 w-full mt-3 font-semibold duration-300 border rounded-lg bg-blue border-blue hover:bg-black/30 hover:bg-white hover:text-blue">
          Buy
        </button>
      </div>
    </Modal>
  );
}
