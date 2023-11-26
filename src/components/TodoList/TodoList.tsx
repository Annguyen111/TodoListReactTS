import styles from './todoList.module.scss'
import TaskList from '../TaskList'
import TaskInput from '../TaskInput'

export default function TodoList() {
  return (
    <div className={styles.todoList}>
      <h1 className={styles.todoHeader}>todos</h1>
      <div className={styles.todoListContainer}>
        <TaskInput />
        <TaskList />
      </div>
      <footer className={styles.footerWrap}>
        <p>Double-click to edit a todo</p>
        <p>Created by Quoc An</p>
        <p>Part of TodoMVC</p>
      </footer>
    </div>
  )
}
