import React, { useRef, useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsEditing(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const onChangeFocus = () => {
    setIsEditing(true)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
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
      setIsEditing(false)
    }
  }

  return (
    <div className={`${styles.taskItem}`}>
      {!isEditing && (
        <label className={styles.taskCheckboxWrap}>
          <input type='checkbox' checked={todo.done} onChange={onChangeCheckbox(todo.id)} />
          <span className={styles.taskCheckboxMark}></span>
        </label>
      )}
      <input
        className={`${styles.taskNameInput} ${isEditing ? styles.taskNameEditing : ''} `}
        type='text'
        ref={inputRef}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        onKeyUp={(e) => onUpdate(todo.id, e)}
        onBlur={() => onBlur(todo.id)}
        disabled={false}
      />
      <div
        className={`${styles.taskName} ${isEditing ? styles.active : ''} ${todo.done ? styles.taskNameDone : ''} `}
        onDoubleClick={onChangeFocus}
      >
        {todo.name}
      </div>
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
