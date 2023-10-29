import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { deleteAllTodoDone, deleteTodo, doneTodo } from '../../redux/list.reducer'
import styles from './taskList.module.scss'
import TaskItem from '../TaskItem'

export default function TaskList() {
  const todoList = useSelector((state: RootState) => state.list.todoList)
  const dispatch = useDispatch()
  const todoCount = todoList.filter((todo) => !todo.done).length
  const [sort, setSort] = useState('all')

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
    <div>
      <div className={styles.tasks}>
        {filteredTodoList.map((todo, index) => (
          <div className={styles.task} key={todo.id}>
            <TaskItem todo={todo} handleDelete={handleDelete} onChangeCheckbox={onChangeCheckbox} />
          </div>
        ))}
      </div>
      <div className={styles.taskFooter}>
        <span>
          {todoCount} Item{todoCount !== 1 ? 's' : ''} left
        </span>
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
    </div>
  )
}
