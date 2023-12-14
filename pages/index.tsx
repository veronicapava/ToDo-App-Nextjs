import Head from 'next/head'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'

export default function Home() {
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
              <TodoList/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
