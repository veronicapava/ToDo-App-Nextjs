import { ITask } from "./types/tasks";

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json()
    return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`api/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json()
    return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`api/tasks/${id}`, {
        method: "DELETE",  
    })
}