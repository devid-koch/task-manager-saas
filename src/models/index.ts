export interface User {
  id: string;
  name: string;
  email: string;
  tasks: Map<string, Task>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "To Do" | "In Progress" | "Done";
}
