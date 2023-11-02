import React, { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { addTodo, completedAllTodo } from '../../redux/list.reducer'
import { useDispatch } from 'react-redux'
import styles from '../TaskInput/taskInput.module.scss'

const initialState: Todo = {
  name: '',
  done: false,
  id: ''
}

export default function TaskInput() {
  const [formData, setFormData] = useState<Todo>(initialState)
  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.name !== '') {
      const formDataWithId = { ...formData }
      dispatch(addTodo(formDataWithId))
      setFormData(initialState)
    }
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
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value.trim() }))}
        />
      </form>
    </div>
  )
}
