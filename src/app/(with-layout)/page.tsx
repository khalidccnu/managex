"use client";

import { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaTimesCircle } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  const [hbMenu, setHbMenu] = useState(true);

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
              className={`md:hidden sticky top-5 text-lg text-[rgb(64,_81,_59)] mb-5`}
            >
              {hbMenu ? (
                <CgMenuLeft
                  className="ms-auto hover:text-[#130f40] cursor-pointer"
                  onClick={(_) => setHbMenu(false)}
                />
              ) : (
                <FaTimesCircle
                  className="ms-auto hover:text-[#130f40] cursor-pointer"
                  onClick={(_) => setHbMenu(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
