import {connection} from "@/libs/db"
import { NextApiRequest, NextApiResponse } from "next"

type Task = {
    id: string,
    text: string,
    completed: boolean
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Task>) {
  if(req.method === "GET"){
    const result = await connection.query('SELECT * FROM tasks') as Task
    res.status(200).json(result)

  } else if (req.method === "POST") {
    const {id,text,completed} = req.body;
    try {
      const result = await connection.query(
        'INSERT INTO tasks (id,text,completed) VALUES (?,?, ?)', [id,text,completed]
      )
      res.send({id:id,text:text,completed:completed})
    } catch (error) {
      console.error('Error inserting into database:', error);
    }

  } else if (req.method === "PUT") {

    const { id } = req.query;
    const {text} = req.body;

    try {
      const result = await connection.query(
        'UPDATE tasks SET text = ? WHERE id = ?', [text,id]
      );
    } catch (error) {
      console.error('Error updating into database:', error);
    }
    
  } else if (req.method === "DELETE"){

    const { id } = req.query;

    try {
      const result = await connection.query(
        'DELETE FROM tasks WHERE id = ?', [id]
      );
    } catch (error) {
      console.error('Error deleting into database:', error);
    }
  } else {
    console.log("Nothing to do")
  }
}
  