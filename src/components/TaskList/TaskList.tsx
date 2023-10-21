import React, { useRef, useState } from 'react'
import styles from './taskList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { deleteAllTodoDone, deleteTodo, doneTodo, updateTodo } from '../list.reducer'

export default function TaskList() {
  const todoList = useSelector((state: RootState) => state.list.todoList)
  const dispatch = useDispatch()
  const todoCount = todoList.filter((todo) => !todo.done).length
  const [sort, setSort] = useState('all')
  const inputRefs = useRef<any[]>([]) // Use an array to store multiple input refs

  const changeFocus = (index: number) => {
    const inputRef = inputRefs.current[index]
    if (inputRef) {
      inputRef.disabled = false
      inputRef.focus()
    }
  }

  const update = (id: string, value: string, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.which === 13) {
      dispatch(
        updateTodo({
          id,
          name: value,
          done: false
        })
      )
      const inputRef = inputRefs.current.find((ref) => ref.dataset.id === id)
      if (inputRef) {
        inputRef.disabled = true
      }
    }
  }

  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(doneTodo(idTodo))
  }

  const handleDelete = (idTodo: string) => {
    dispatch(deleteTodo(idTodo))
  }

  const handleDeleteAllTodoDone = () => {
    dispatch(deleteAllTodoDone())
  }

  const filteredTodoList =
    sort === 'all'
      ? todoList
      : todoList.filter((todo) => (sort === 'active' && !todo.done) || (sort === 'completed' && todo.done))

  return (
    <>
      <div className='mb-2'>
        <div className={styles.tasks}>
          {filteredTodoList.map((todo, index) => (
            <div className={styles.task} key={todo.id}>
              <input
                type='checkbox'
                className={styles.taskCheckBox}
                checked={todo.done}
                onChange={onChangeCheckbox(todo.id)}
              />

              <textarea
                ref={(ref) => (inputRefs.current[index] = ref)}
                data-id={todo.id}
                disabled={!inputRefs.current[index]}
                defaultValue={todo.name}
                onKeyDown={(e) => update(todo.id, inputRefs.current[index]?.value || '', e)}
                className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}
              />

              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={() => changeFocus(index)}>
                  ✒️
                </button>
                <button className={styles.taskBtn} onClick={() => handleDelete(todo.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.taskFooter}>
        <span>{todoCount} Item left</span>
        <div>
          <button onClick={() => setSort('all')} className={sort === 'all' ? styles.active : ''}>
            All
          </button>
          <button onClick={() => setSort('active')} className={sort === 'active' ? styles.active : ''}>
            Active
          </button>
          <button onClick={() => setSort('completed')} className={sort === 'completed' ? styles.active : ''}>
            Completed
          </button>
        </div>
        <button onClick={handleDeleteAllTodoDone}>Clear completed</button>
      </div>
    </>
  )
}
