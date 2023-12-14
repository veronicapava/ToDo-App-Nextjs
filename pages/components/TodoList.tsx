import { ITask } from "@/types/tasks";
import React from "react"

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
            {tasks.map(task => (
            <tr key={task.id}>
                <td>{task.text}</td>
                <td>Done</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
