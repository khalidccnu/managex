export const addTask = (task: {
  id: string;
  title: string;
  description: string;
  status: string;
  create: object;
}) => {
  const tasks: object[] = getTasks();

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTasks = () => {
  let tasks: object[] = [];
  const getTasks: null | string = localStorage.getItem("tasks");

  if (getTasks) tasks = JSON.parse(getTasks);

  return tasks;
};
