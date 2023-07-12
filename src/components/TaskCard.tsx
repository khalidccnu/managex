import { FC } from "react";
import { RiCalendarTodoLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import {
  TbCircleCheck,
  TbEdit,
  TbProgressCheck,
  TbTrashX,
} from "react-icons/tb";

type Props = {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  handleDelete: Function;
  handleStatus: Function;
  setET: Function;
};

const TaskCard: FC<Props> = ({ task, handleDelete, handleStatus, setET }) => {
  return (
    <div className={`bg-white rounded-xl`}>
      <div className="h-[150px] overflow-hidden">
        <h4
          className={`bg-[rgb(64,_81,_59)] text-white p-2 rounded-t-xl whitespace-nowrap overflow-hidden overflow-ellipsis`}
        >
          {task.title}
        </h4>
        <p className="p-2">
          {task.description || "This task has no description!"}
        </p>
      </div>
      <div className="flex justify-between items-center p-2 rounded-b-xl text-xl">
        <div className={`flex space-x-0.5`}>
          <BiTask
            className={`cursor-pointer`}
            onClick={() => setET({ id: task.id, action: "view" })}
          />
          <TbEdit
            className={`cursor-pointer`}
            onClick={() => setET({ id: task.id, action: "edit" })}
          />
          <TbTrashX
            className={`cursor-pointer`}
            onClick={() => handleDelete(task.id)}
          />
        </div>
        <div className={`flex items-center space-x-0.5`}>
          <RiCalendarTodoLine
            className={
              task.status === "todo"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
            onClick={() => handleStatus(task.id, "todo")}
          />
          <TbProgressCheck
            className={
              task.status === "progress"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
            onClick={() => handleStatus(task.id, "progress")}
          />
          <TbCircleCheck
            className={
              task.status === "complete"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
            onClick={() => handleStatus(task.id, "complete")}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
