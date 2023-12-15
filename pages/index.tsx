import Head from 'next/head'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { useEffect, useState } from 'react';

export default function Home() {
      const baseUrl = 'http://localhost:3001'
      const [tasks, setTasks] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${baseUrl}/tasks`);
            const json = await response.json();
            setTasks(json);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
  
  return (
    <>
      <Head>
        <title>To Do App</title>
        <meta name="description" content="An app to organize your tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <h1>To Do App</h1>
              <AddTask/>
              <TodoList tasks={tasks} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
