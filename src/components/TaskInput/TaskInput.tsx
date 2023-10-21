import React, { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { addTodo, completedAllTodo, updateTodo } from '../list.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from '../TaskInput/taskInput.module.scss'

const initialState: Todo = {
  name: '',
  done: false,
  id: ''
}

export default function TaskInput() {
  const [formData, setFormData] = useState<Todo>(initialState)
  const editingPost = useSelector((state: RootState) => state.list.editingTodo)
  const dispatch = useDispatch()

  useEffect(() => {
    setFormData(editingPost || initialState)
  }, [editingPost])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingPost) {
      dispatch(updateTodo(formData))
    } else {
      const formDataWithId = { ...formData }
      dispatch(addTodo(formDataWithId))
    }
    setFormData(initialState)
  }

  const completedAll = () => {
    dispatch(completedAllTodo())
  }

  return (
    <div className={styles.container}>
      <button onClick={completedAll} className={styles.form_btn}>
        ✔️
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter task ....'
          value={editingPost ? editingPost.name : formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
        />
        {/* <button hidden type='submit'>
          {currentTodo ? '✔️' : '➕'}
        </button> */}
      </form>
    </div>
  )
}
