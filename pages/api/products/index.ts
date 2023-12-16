import {conection} from "@/libs/db"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

type Task = {
    id: string,
    text: string,
    completed: boolean
}

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Task>
  ) {
    const result = await conection.query('SELECT * FROM tasks') as Task
    console.log("The result", result)
    res.status(200).json(result)
  }
  