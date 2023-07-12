import { FC, Fragment, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useFormik } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { MdEditNote } from "react-icons/md";
import { Tasks } from "@/providers/TasksProvider";
import { getTasks } from "@/utils/localStorage";

type Props = {
  eT: null | { id: string; action: string };
  setET: Function;
  isETMO: boolean;
  setETMO: Function;
  tasks?: Tasks;
};

type Title = {
  title?: string;
};

const validateForm = (values: Title) => {
  const errors: Title = {};

  if (!values.title) errors.title = "Required";
  else if (values.title.length < 7) errors.title = "at least 7 characters long";

  return errors;
};

const EditTaskModal: FC<Props> = ({ eT, setET, isETMO, setETMO, tasks }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validate: validateForm,
    onSubmit: (values) => {
      const taskAll: { id?: string; title?: string; description?: string }[] =
        getTasks();
      const taskIndex = taskAll.findIndex((elem) => elem.id === eT?.id);

      (taskAll[taskIndex].title = values.title),
        (taskAll[taskIndex].description = values.description);

      localStorage.setItem("tasks", JSON.stringify(taskAll));
      setETMO(false);
      toast.success("Task updated!");
      tasks?.setRefetch(!tasks.reFetch);
      setET(null);
    },
  });

  useEffect(() => {
    if (eT?.action === "edit") {
      const taskAll: { id?: string; title?: string; description?: string }[] =
        getTasks();
      const taskIndex = taskAll.findIndex((elem) => elem.id === eT?.id);

      const task = taskAll[taskIndex];
      formik.setValues({
        // @ts-ignore
        title: task.title,
        // @ts-ignore
        description: task.description,
      });
    }
  }, [eT?.id]);

  return (
    <Transition appear show={isETMO} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setETMO(false);
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
                  <MdEditNote />
                  <span>Edit Task</span>
                </Dialog.Title>
                <form className="form-control grid grid-cols-1 gap-3 my-3">
                  <div className="flex flex-col gap-0.5">
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      className="input input-sm input-bordered rounded w-full focus:outline-0"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.title ? (
                      <small className="text-red-600 ml-0.5">
                        {formik.errors.title}
                      </small>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <textarea
                      placeholder="Write something about your task..."
                      name="description"
                      className="textarea textarea-sm textarea-bordered rounded w-full resize-none focus:outline-0"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    ></textarea>
                    {formik.errors.description ? (
                      <small className="text-red-600 ml-0.5">
                        {formik.errors.description}
                      </small>
                    ) : null}
                  </div>
                </form>
                <div className={`text-xs text-white font-medium space-x-1.5`}>
                  <button
                    type="button"
                    className="bg-[#40513b] hover:bg-[#609966] px-4 py-2 rounded-md"
                    onClick={formik.submitForm}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-[#40513b] hover:bg-[#609966] px-4 py-2 rounded-md"
                    onClick={() => {
                      setETMO(false);
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

export default inject("tasks")(observer(EditTaskModal));
