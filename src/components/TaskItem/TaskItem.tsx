import React, { useRef, useState } from 'react'
import styles from './taskItem.module.scss'
import { Todo } from '../../@types/todo.type'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../../redux/list.reducer'

interface TaskItemProps {
  todo: Todo
  handleDelete: (idTodo: string) => void
  onChangeCheckbox: (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TaskItem(props: TaskItemProps) {
  const { todo, handleDelete, onChangeCheckbox } = props
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const onChangeFocus = () => {
    setIsEditing(true)
    if (inputRef.current) {
      inputRef.current.disabled = false
      inputRef.current.focus()
    }
  }

  const handleUpdate = (id: string, value: string) => {
    dispatch(updateTodo({ id, name: value, done: todo.done }))
  }

  const onUpdate = (id: string, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      handleUpdate(id, inputRef.current.value)
      setIsEditing(false)
    }
  }

  const onBlur = (id: string) => {
    if (inputRef.current) {
      handleUpdate(id, inputRef.current.value)
      inputRef.current.disabled = true
      setIsEditing(false)
    }
  }

  return (
    <>
      <input type='checkbox' className={styles.taskCheckBox} checked={todo.done} onChange={onChangeCheckbox(todo.id)} />
      {isEditing ? (
        <textarea
          ref={inputRef}
          defaultValue={todo.name}
          onKeyUp={(e) => onUpdate(todo.id, e)}
          onBlur={() => onBlur(todo.id)}
          className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}
        />
      ) : (
        <div className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`} onDoubleClick={onChangeFocus}>
          {todo.name}
        </div>
      )}
      <div className={styles.taskActions}>
        <button className={styles.taskBtn} onClick={() => handleDelete(todo.id)}>
          🗑️
        </button>
      </div>
    </>
  )
}
