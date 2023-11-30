export default function Coincard() {
  return (
    <div className="p-1 mx-2 my-1 duration-300 border border-transparent rounded-md bg-white/80 backdrop-blur-lg hover:shadow-md hover:shadow-slate-800 hover:border-blue">
      <img
        src="https://img-cdn.magiceden.dev/rs:fit:800:0:0/plain/https://bitmap-img.magiceden.dev/v1/d1ae814fa7c62782bc43968293022854119dd6afa9d886f80c3d407f71652d09i0"
        className="object-cover p-2 h-54 rounded-t-md"
        alt=""
      />
      <div className="p-3">
        <p className="text-lg font-bold text-center text-slate-800 ">545009.litemap</p>
        <div className="flex justify-around">
          <p className=" text-cyan-500">Seller : </p>
          <p className="font-bold text-right text-green-500"> DMarM...Z6jWq</p>
        </div>
        <hr className="mt-1 border-l-2 border-cyan-50" />
        <div className="flex justify-between px-3 py-2">
          <p className="flex items-center gap-1 font-semibold text-amber-500">
            <img src="/img/lite.svg" className="w-4 h-4" alt="" />
            0.0000000025
          </p>
          <p className=" text-stone-500">$80</p>
        </div>
        <div className="flex justify-center">
          <button className="w-3/4 py-2 my-1 font-semibold font-bold duration-300 border rounded-lg bg-blue border-blue hover:bg-black/30 hover:bg-white hover:text-blue">
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}