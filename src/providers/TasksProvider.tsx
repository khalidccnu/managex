import { makeObservable, observable, action } from "mobx";

export class Tasks {
  loading: boolean = true;
  data: object[] = [];
  reFetch: boolean = false;

  constructor() {
    makeObservable(this, {
      loading: observable,
      data: observable,
      reFetch: observable,
      setLoading: action,
      setData: action,
      setRefetch: action,
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setData(data: object[]) {
    this.data = data;
  }

  setRefetch(reFetch: boolean) {
    this.reFetch = reFetch;
  }
}

const TasksProvider = {
  tasks: new Tasks(),
};

export default TasksProvider;
