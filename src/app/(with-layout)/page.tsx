"use client";

import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { CgMenuLeft } from "react-icons/cg";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import AddTaskModal from "@/components/modals/AddTaskModal";
import Sidebar from "@/components/Sidebar";
import NoTask from "@/components/NoTask";
import { Tasks } from "@/providers/TasksProvider";
import { getTasks } from "@/utils/localStorage";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import TasksContainer from "@/components/TasksContainer";
import EditTaskModal from "@/components/modals/EditTaskModal";

type Props = {
  tasks: Tasks;
};

const Home: FC<Props> = ({ tasks }) => {
  const [hbMenu, setHbMenu] = useState(true);
  const [isATMO, setATMO] = useState(false);
  const [eT, setET] = useState<null | string>(null);
  const [isETMO, setETMO] = useState(false);

  const handleResize = () => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const taskAll: object[] = getTasks();
    tasks.setData(taskAll);
    tasks.setLoading(false);
  }, [tasks.reFetch]);

  useEffect(() => {
    if (eT) setETMO(true)
  }, [eT]);

  return !tasks.loading ? (
    <section className={`py-5`}>
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-[20rem_auto] gap-5`}>
          <Sidebar hbMenu={hbMenu} />
          <div>
            <div
              className={`flex justify-between sticky top-5 text-lg text-[rgb(64,_81,_59)] mb-5 z-10 space-x-3`}
            >
              {tasks.data.length ? (
                <Header setATMO={setATMO} />
              ) : (
                <FaPlusCircle
                  className={`md:text-4xl hover:text-[#130f40] cursor-pointer`}
                  onClick={() => setATMO(!isATMO)}
                />
              )}
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
            {tasks.data.length ? <TasksContainer setET={setET} tasks={tasks} /> : <NoTask />}
          </div>
        </div>
      </div>
      <AddTaskModal isATMO={isATMO} setATMO={setATMO} />
      <EditTaskModal eT={eT} setET={setET} isETMO={isETMO} setETMO={setETMO} />
    </section>
  ) : (
    <Loader />
  );
};

export default inject("tasks")(observer(Home));
