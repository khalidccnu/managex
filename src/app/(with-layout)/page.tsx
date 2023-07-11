"use client";

import { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import AddTaskModal from "@/components/modals/AddTaskModal";
import Sidebar from "@/components/Sidebar";
import NoTask from "@/components/NoTask";

const Home = () => {
  const [hbMenu, setHbMenu] = useState(true);
  const [isATMO, setATMO] = useState(false);

  const handleResize = () => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`py-5`}>
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-[20rem_auto] gap-5`}>
          <Sidebar hbMenu={hbMenu} />
          <div>
            <div
              className={`flex justify-between sticky top-5 text-lg text-[rgb(64,_81,_59)] mb-5 z-10`}
            >
              <FaPlusCircle
                className={`md:text-4xl hover:text-[#130f40] cursor-pointer`}
                onClick={() => setATMO(!isATMO)}
              />
              <div className={`md:hidden`}>
                {hbMenu ? (
                  <CgMenuLeft
                    className="hover:text-[#130f40] cursor-pointer"
                    onClick={() => setHbMenu(false)}
                  />
                ) : (
                  <FaTimesCircle
                    className="hover:text-[#130f40] cursor-pointer"
                    onClick={() => setHbMenu(true)}
                  />
                )}
              </div>
            </div>
            <NoTask />
          </div>
        </div>
      </div>
      <AddTaskModal isATMO={isATMO} setATMO={setATMO} />
    </section>
  );
};

export default Home;
