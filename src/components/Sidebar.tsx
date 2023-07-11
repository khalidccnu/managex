"use client";

import { FC, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

type Props = {
  hbMenu: boolean;
};

const Sidebar: FC<Props> = ({ hbMenu }) => {
  const [greetings, setGreetings] = useState<null | String>(null);

  useEffect(() => {
    {
      const hours: number = new Date().getHours();

      if (hours < 12) setGreetings("Morning");
      else if (hours >= 12 && hours <= 18) setGreetings("Afternoon");
      else if (hours > 18 && hours <= 24) setGreetings("Evening");
    }
  }, []);

  return (
    <div
      className={`md:self-start fixed ${
        hbMenu ? "-left-96" : "left-0"
      } top-0 md:sticky md:top-5 bg-[rgb(157,_192,_139)] w-80 md:w-auto h-full md:h-auto p-5 md:rounded z-10 transition-[left] duration-500`}
    >
      <div
        className={`h-full md:h-[calc(100vh_-_5rem)] overflow-y-auto scrollbar-hide text-[rgb(64,_81,_59)]`}
      >
        <figure
          className={`flex justify-center items-center bg-gray-50 w-20 h-20 rounded-full mx-auto`}
        >
          <FaUser className={`text-2xl`} />
        </figure>
        <h2 className={`font-bold text-center mt-3`}>
          Hi, Good {greetings} 👋
        </h2>
        <ul className={`flex flex-col mt-5 space-y-3`}>
          <li>
            <span
              className={`flex justify-center bg-gray-50 px-2 py-1 rounded`}
            >
              You have no pin task!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
