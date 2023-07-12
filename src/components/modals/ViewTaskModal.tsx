import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiTask } from "react-icons/bi";
import { getTasks } from "@/utils/localStorage";

type Props = {
  eT: null | { id: string; action: string };
  setET: Function;
  isVTMO: boolean;
  setVTMO: Function;
};

const ViewTaskModal: FC<Props> = ({ eT, setET, isVTMO, setVTMO }) => {
  const [task, setTask] = useState<null | {
    title?: string;
    description?: string;
  }>(null);

  useEffect(() => {
    if (eT?.action === "view") {
      const taskAll: { id?: string; title?: string; description?: string }[] =
        getTasks();
      const taskIndex = taskAll.findIndex((elem) => elem.id === eT.id);

      setTask(taskAll[taskIndex]);
    }
  }, [eT?.id]);

  return (
    <Transition appear show={isVTMO} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setVTMO(false);
          setET(null);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 px-5 overflow-y-auto">
          <div className="flex justify-center items-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-96 p-6 rounded-2xl shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center text-lg text-gray-900 font-semibold space-x-1"
                >
                  <BiTask />
                  <span>{task?.title}</span>
                </Dialog.Title>
                <p className={`max-h-[7.8rem] overflow-auto`}>
                  {task?.description}
                </p>
                <div
                  className={`text-xs text-white font-medium ${
                    !task?.description ? "mt-3" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="bg-[#40513b] hover:bg-[#609966] px-4 py-2 rounded-md"
                    onClick={() => {
                      setVTMO(false);
                      setET(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewTaskModal;
