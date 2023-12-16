import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("")

  const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const uuid = uuidv4();
    const shortNumber = uuid.replace(/-/g, '').substring(0, 30);

    await addTodo({
      id: shortNumber,
      text: newTaskValue,
      completed: false
    })
      setNewTaskValue("")
      setModalIsOpen(false)
      router.refresh()
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">Add task</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal-dialog mx-auto my-5 modal-sm"
        // overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          
          <div className="modal-body">
            <form onSubmit={handleSubmitNewToDo}>
              <div className="modal-header">
                <h5 className="modal-title">ADD TASK HERE</h5>
              </div>
            <div className="modal-actions">
              <input
                type="text"
                onChange={e => setNewTaskValue(e.target.value)}
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
    </div>
  )
}

export default AddTask
