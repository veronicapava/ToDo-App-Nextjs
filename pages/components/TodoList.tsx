import { ITask } from "@/types/tasks";
import React from "react"
import Task from "./Task";

interface TodoListProps {
    tasks?: ITask[]; 
}

let defaultTasks: ITask[] = [{
  id: "1",
  text: "Create a new task",
  completed: false,
}]


const TodoList: React.FC<TodoListProps> = ({tasks = defaultTasks}) => {
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map((task) => (<Task key={task.id} task={task}/>))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
