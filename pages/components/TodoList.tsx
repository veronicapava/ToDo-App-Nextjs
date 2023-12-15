import { ITask } from "@/types/tasks";
import React from "react"
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (<Task key={task.id} task={task}/>))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
