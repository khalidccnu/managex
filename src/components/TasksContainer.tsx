import { FC } from "react";
import toast from "react-hot-toast";
import { getTasks } from "@/utils/localStorage";
import TaskCard from "@/components/TaskCard";

type Props = {
  tasks: any;
  setET: Function;
};

const TasksContainer: FC<Props> = ({ tasks, setET }) => {
  const handleDelete = (id: string) => {
    const taskAll: { id?: string }[] = getTasks();
    const taskIndex = taskAll.findIndex((elem) => elem.id === id);

    taskAll.splice(taskIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(taskAll));
    toast.success("Task deleted!");
    tasks?.setRefetch(!tasks.reFetch);
  };

  const handleStatus = (id: string, status: string) => {
    const taskAll: { id?: string; status?: string }[] = getTasks();
    const taskIndex = taskAll.findIndex((elem) => elem.id === id);

    taskAll[taskIndex].status = status;
    localStorage.setItem("tasks", JSON.stringify(taskAll));
    toast.success(`Task status changed to ${status}!`);
    tasks?.setRefetch(!tasks.reFetch);
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5`}
    >
      {tasks.data.map((task: any) => (
        <TaskCard
          key={task.id}
          handleDelete={handleDelete}
          handleStatus={handleStatus}
          setET={setET}
          task={task}
        />
      ))}
    </div>
  );
};

export default TasksContainer;
