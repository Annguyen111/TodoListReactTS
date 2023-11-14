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
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(todo.name)

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

  const onUpdate = (id: string, e: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div className={`${!isEditing ? styles.taskItem : styles.taskItemEditing}`}>
      {!isEditing && (
        <label className={styles.taskCheckboxWrap}>
          <input type='checkbox' checked={todo.done} onChange={onChangeCheckbox(todo.id)} />
          <span className={styles.taskCheckboxMark}></span>
        </label>
      )}
      {isEditing ? (
        <input
          type='text'
          ref={inputRef}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onKeyUp={(e) => onUpdate(todo.id, e)}
          onBlur={() => onBlur(todo.id)}
          disabled={!isEditing}
          className={`${styles.taskName} ${styles.taskNameEditing}`}
        />
      ) : (
        <div className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`} onClick={onChangeFocus}>
          {todo.name}
        </div>
      )}
      {!isEditing && (
        <div className={styles.taskActions}>
          <button className={styles.taskBtn} onClick={() => handleDelete(todo.id)}>
            ×
          </button>
        </div>
      )}
    </div>
  )
}
