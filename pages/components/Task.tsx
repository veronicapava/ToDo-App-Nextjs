import { deleteTodo, editTodo } from '@/api';
import { ITask } from '@/types/tasks'
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import Modal from 'react-modal';

interface TaskProps {
  task: ITask
}

let defaultTask: ITask = {
  id: "1",
  text: "Create a new task",
  completed: false,
}

const Task: React.FC<TaskProps> = ({task = defaultTask}) => {
  const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDeleted] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(task.text)
    const [isChecked, setChecked] = useState(task.completed);

    const closeModal = () => {
      setOpenModalEdit(false);
    };

    const closeModalDelete = () => {
      setOpenModalDeleted(false);
    };

    const handleCheckboxChange = async () => {
      const updatedTodo = await editTodo({
        id: task.id,
        text: task.text,
        completed: !isChecked,
      });
      setChecked(updatedTodo.completed);
      router.refresh();
    };

    const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
        if(taskToEdit !== undefined && taskToEdit !== null) {
          await editTodo({
            id: task.id,
            text: taskToEdit,
            completed: task.completed
          })
          setTaskToEdit("")
          setOpenModalEdit(false)
          router.refresh()
        }else {
          console.error("taskToEdit its not defined");
        }
    }
    
    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id)
      setOpenModalDeleted(false)
      router.refresh()
    }
  
  return (
        <tr>
           <td style={{ display: 'flex', alignItems: 'center' }}>
              <input
                  style={{ marginRight: '8px' }} 
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </td>
            <td>
              <FaEdit onClick={() => setOpenModalEdit(true)} cursor='pointer' size={20}/>

                <Modal
                    isOpen={openModalEdit}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    className="modal-dialog mx-auto my-5 modal-sm"
                >
                    <div className="modal-content">
                      
                      <div className="modal-body">
                        <form onSubmit={handleSubmitEditToDo}>
                          <div className="modal-header d-flex justify-content-center align-items-center">
                            <h5 style={{ fontWeight: 'bold' }} className="modal-title">EDIT YOUR TASK</h5>
                          </div>
                        <div className="modal-input-group d-flex justify-content-between mt-3">
                          <input
                            value={taskToEdit}
                            type="text"
                            onChange={e => setTaskToEdit(e.target.value)}
                            placeholder="Type here"
                            className='input input-bordered flex-grow-1 mr-2'
                          />
                        </div>

                        <div className="modal-buttons d-flex justify-content-between mt-3">

                            <button type="button" className="btn btn-danger" onClick={closeModal}>
                              X
                            </button>
                    
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>

                        </div>
              
                      </form>
                      </div>
                    
                    </div>
                </Modal>

              <FaRegTrashAlt onClick={() => setOpenModalDeleted(true)} cursor='pointer' size={20}/>

              <Modal
                    isOpen={openModalDelete}
                    onRequestClose={closeModalDelete}
                    contentLabel="Modal"
                    className="modal-dialog mx-auto my-5 modal-sm"
                >
                    <div className="modal-content">
                      <h5 style={{ fontWeight: 'bold' }} className="modal-title text-center">Do you want to delete this task?</h5>
                      <button onClick={() => handleDeleteTask(task.id)} className='btn btn-danger'>Yes</button>
                      <button type="button" className="btn btn-primary mt-2" onClick={closeModalDelete}>
                              No
                      </button>
                  </div>
                </Modal>
            </td>
        </tr>
  )
}

export default Task
