"use client";

import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { CgMenuLeft } from "react-icons/cg";
import { FaTimesCircle } from "react-icons/fa";
import AddTaskModal from "@/components/modals/AddTaskModal";
import Sidebar from "@/components/Sidebar";
import NoTask from "@/components/NoTask";
import { getTasks } from "@/utils/localStorage";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import TasksContainer from "@/components/TasksContainer";
import ViewTaskModal from "@/components/modals/ViewTaskModal";
import EditTaskModal from "@/components/modals/EditTaskModal";

const Home = (props: any) => {
  const { tasks } = props;
  const [hbMenu, setHbMenu] = useState(true);
  const [isATMO, setATMO] = useState(false);
  const [eT, setET] = useState<null | { id: string; action: string }>(null);
  const [isVTMO, setVTMO] = useState(false);
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
    if (eT?.action === "view") setVTMO(true);
    if (eT?.action === "edit") setETMO(true);
  }, [eT?.id]);

  return !tasks.loading ? (
    <section className={`py-5`}>
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-[20rem_auto] gap-5`}>
          <Sidebar hbMenu={hbMenu} />
          <div>
            <div
              className={`flex justify-between sticky top-5 text-lg text-[rgb(64,_81,_59)] mb-5`}
            >
              <Header setATMO={setATMO} />
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
            {tasks.data.length ? (
              <TasksContainer setET={setET} tasks={tasks} />
            ) : (
              <NoTask />
            )}
          </div>
        </div>
      </div>
      <AddTaskModal isATMO={isATMO} setATMO={setATMO} />
      <ViewTaskModal eT={eT} setET={setET} isVTMO={isVTMO} setVTMO={setVTMO} />
      <EditTaskModal eT={eT} setET={setET} isETMO={isETMO} setETMO={setETMO} />
    </section>
  ) : (
    <Loader />
  );
};

export default inject("tasks")(observer(Home));
