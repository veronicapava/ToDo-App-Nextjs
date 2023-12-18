import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result =
      await sql`CREATE TABLE tasks ( id varchar(30), text varchar(255), completed boolean );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}