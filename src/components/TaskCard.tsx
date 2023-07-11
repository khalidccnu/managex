import { FC } from "react";
import { RiCalendarTodoLine } from "react-icons/ri";
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
};

const TaskCard: FC<Props> = ({ task }) => {
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
          <TbEdit className={`cursor-pointer`} />
          <TbTrashX className={`cursor-pointer`} />
        </div>
        <div className={`flex items-center space-x-0.5`}>
          <RiCalendarTodoLine
            className={
              task.status === "todo"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
          />
          <TbProgressCheck
            className={
              task.status === "progress"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
          />
          <TbCircleCheck
            className={
              task.status === "complete"
                ? "text-2xl text-[rgb(64,_81,_59)] pointer-events-none"
                : "cursor-pointer"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
