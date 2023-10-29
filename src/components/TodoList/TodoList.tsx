import styles from './todoList.module.scss'
import TaskList from '../TaskList'
import TaskInput from '../TaskInput'

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
