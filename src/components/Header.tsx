import { FC, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

type Props = {
  setATMO: Function;
};

const Header: FC<Props> = ({ setATMO }) => {
  const [search, setSearch] = useState("");

  return (
    <header className="flex justify-between w-full space-x-3">
      <input
        type="text"
        placeholder="Search here..."
        className="input input-md input-bordered rounded w-full focus:outline-0"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button
        type="button"
        className="btn btn-md inline-flex items-center bg-[#40513b] hover:bg-[#609966] text-white px-4 py-2 rounded"
        onClick={() => setATMO(true)}
      >
        <FaPlusCircle />
        <span className={`whitespace-nowrap`}>Add Task</span>
      </button>
    </header>
  );
};

export default Header;
