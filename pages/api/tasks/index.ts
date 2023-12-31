import { NextApiRequest, NextApiResponse } from "next"
import { sql } from '@vercel/postgres';
 
type Task = {
    id: string,
    text: string,
    completed: boolean
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Task>) {
  if(req.method === "GET"){
    const result = await sql`SELECT * FROM tasks;` as unknown as Task
    res.status(200).json(result)

  } else if (req.method === "POST") {
    const {id,text,completed} = req.body;
    try {
      const result = await sql`INSERT INTO tasks (id, text, completed) VALUES (${id}, ${text}, ${completed});`
      res.send({id:id,text:text,completed:completed})
    } catch (error) {
      console.error('Error inserting into database:', error);
    }

  } else if (req.method === "PUT") {

    const { id } = req.query;
    const {text} = req.body;

    try {
      const result = await sql`UPDATE tasks SET text = ${text} WHERE id = ${<string>id};`
    } catch (error) {
      console.error('Error updating into database:', error);
    }
    
  } else if (req.method === "DELETE"){

    const { id } = req.query;

    try {
      const result = await sql`DELETE FROM tasks WHERE id = ${<string>id}`
    } catch (error) {
      console.error('Error deleting into database:', error);
    }
  } else {
    console.log("Nothing to do")
  }
}
  