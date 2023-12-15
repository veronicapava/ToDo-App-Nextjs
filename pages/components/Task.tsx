import { deleteTodo, editTodo } from '@/api';
import { ITask } from '@/types/tasks'
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import Modal from 'react-modal';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
  const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDeleted] = useState(false)

    const [taskToEdit, setTaskToEdit] = useState(task.text)

    const closeModal = () => {
      setOpenModalEdit(false);
    };

    const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
      await editTodo({
        id: task.id,
        text: taskToEdit
      })
      setTaskToEdit("")
      setOpenModalEdit(false)
      router.refresh()
    }
    
    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id)
      setOpenModalDeleted(false)
      router.refresh()
    }
  
  return (
        <tr>
            <td>{task.text}</td>
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
                          <div className="modal-header">
                            <h5 className="modal-title">EDIT YOUR TASK</h5>
                          </div>
                        <div className="modal-actions">
                          <input
                            value={taskToEdit}
                            type="text"
                            onChange={e => setTaskToEdit(e.target.value)}
                            placeholder="Type here"
                            className='input input-bordered w-full'
                          />
                        </div>

                        <button type="button" className="btn btn-danger" onClick={closeModal}>
                          X
                        </button>
                
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
              
                      </form>
                      </div>
                    
                    </div>
                </Modal>

              <FaRegTrashAlt onClick={() => setOpenModalDeleted(true)} cursor='pointer' size={20}/>

              <Modal
                    isOpen={openModalDelete}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    className="modal-dialog mx-auto my-5 modal-sm"
                >
                  <h3>Are you sure, you want to delete this task?</h3>
                  <button onClick={() => handleDeleteTask(task.id)} className='btn btn-danger'>Yes</button>
                  <button type="button" className="btn btn-danger" onClick={closeModal}>
                          X
                  </button>
                </Modal>
            </td>
        </tr>
  )
}

export default Task
