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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue.trim() === '') {
      setFormData((prev) => ({
        ...prev,
        name: ''
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        name: inputValue
      }))
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.taskCheckboxWrap}>
          <input type='checkbox' onClick={completedAll} />
          <span className={styles.taskCheckboxMark}></span>
        </label>
        <input type='text' placeholder='Add task in here ....' value={formData.name} onChange={handleInputChange} />
      </form>
    </div>
  )
}
