import { FaFastBackward, FaFastForward } from "react-icons/fa";
import Link from "next/link";

const Pagination = () => {
  return (
    <nav className="flex items-center justify-center mt-8">
      <ul className="flex">
        <li className="mr-2">
          <Link href="#" className="" >
            <FaFastBackward className="text-lg text-center" />
          </Link>
        </li>
        <li className="mr-2">
          <Link href="#" className="px-4 py-2 mr-1 font-bold rounded-md border-1 text-gray-80 border-sky-5000 bg-slate-500 text-sky-500" >
            1
          </Link>
        </li>
        <li className="mr-2">
          <Link href="#" className="px-4 py-2 mr-1 font-bold text-gray-800 bg-gray-200 rounded-md hover:bg-sky-500 hover:text-white" >
            2
          </Link>
        </li>
        <li className="mr-2">
          <Link href="#" className="px-4 py-2 mr-1 text-gray-800 bg-gray-200 rounded-md" >
            3
          </Link>
        </li>
        <li className="mr-2">
          <Link href="#" className="" >
            <FaFastForward  className="text-lg text-center"/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;