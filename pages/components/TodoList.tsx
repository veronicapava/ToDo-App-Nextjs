import React from "react"

const TodoList = () => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Study english</td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Make breakfast</td>
            <td>In process</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
