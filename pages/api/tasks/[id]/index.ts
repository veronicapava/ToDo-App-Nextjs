import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next"

type Task = {
  id: string,
  text: string,
  completed: boolean,
  success?:boolean,
  message?:string,
  affectedRows?: number,
}
type Result = {
  message?: string,
  success?: boolean,
}
export default async function handler(req: NextApiRequest,res: NextApiResponse<Task>) {
  const { id } = req.query;  
  
  if (req.method === "PUT") {
    const {text,completed} = req.body;

      try {
        const result = await sql`UPDATE tasks SET text = ${text}, completed = ${completed}  WHERE id = ${<string>id};`
        const affectedRows = (result as unknown as { affectedRows: number }).affectedRows;

        res.status(200).json({
          success: true,
          affectedRows: affectedRows,
          id: "",
          text: "",
          completed: completed
        });
      } catch (error) {
        console.error('Error updating into database:', error);
      }
      
    } else if (req.method === "DELETE"){
      try {
        const result = await sql`DELETE FROM tasks WHERE id = ${<string>id};`
          
        const deletedResult : Result = {
          success: (result as any).affectedRows > 0,
        }

        if (deletedResult.success) {
          deletedResult.message = 'Task deleted successfully';
          res.status(200).json({
            success: true, message: 'Task deleted successfully',
            id: "",
            text: "",
            completed: false
          });
        } else {
          deletedResult.message = 'Task not found';
          res.status(404);
        }
      } catch (error) {
        console.error('Error deleting into database:', error);
      }
  
    } else {
      console.log("Nothing to do")
    }
  }
    