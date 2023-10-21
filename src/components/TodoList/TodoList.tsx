import styles from './todoList.module.scss'
import TaskList from '../TaskList/TaskList'
import TaskInput from '../TaskInput/TaskInput'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
  return (
    <div className={styles.todoList}>
      <h1 className={styles.todoHeader}>TODO LIST</h1>
      <div className={styles.todoListContainer}>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  )
}
