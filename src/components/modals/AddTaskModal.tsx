import { FC, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { MdAddTask } from "react-icons/md";
import { nanoid } from "nanoid";
import { Tasks } from "@/providers/TasksProvider";
import { addTask } from "@/utils/localStorage";

type Props = {
  isATMO: boolean;
  setATMO: Function;
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

const AddTaskModal: FC<Props> = ({ isATMO, setATMO, tasks }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "todo",
    },
    validate: validateForm,
    onSubmit: (values) => {
      addTask({ id: nanoid(), ...values, create: new Date() });
      setATMO(false);
      toast.success("New Task added!");
      tasks?.setRefetch(!tasks.reFetch);
    },
  });

  return (
    <Transition appear show={isATMO} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setATMO(false)}>
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
                  <MdAddTask />
                  <span>New Task</span>
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
                    onClick={() => setATMO(false)}
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

export default inject("tasks")(observer(AddTaskModal));
