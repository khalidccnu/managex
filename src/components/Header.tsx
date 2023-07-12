import { FC } from "react";
import { FaPlusCircle } from "react-icons/fa";

type Props = {
  setATMO: Function;
};

const Header: FC<Props> = ({ setATMO }) => {
  return (
    <header>
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
