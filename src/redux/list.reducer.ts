import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../@types/todo.type'
import { initialTodoList } from '../constants/list'

interface ListStage {
  todoList: Todo[]
}

const initialState: ListStage = {
  todoList: initialTodoList
}

const listSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todoList.push(action.payload)
      },
      prepare: (todo: Omit<Todo, 'id'>) => ({
        payload: {
          ...todo,
          name: todo.name.trim(),
          id: nanoid()
        }
      })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      const foundTodoIndex = state.todoList.findIndex((todo) => todo.id === todoId)
      if (foundTodoIndex !== -1) {
        state.todoList.splice(foundTodoIndex, 1)
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            name: action.payload.name
          }
        }
        return todo
      })
    },
    doneTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            done: !todo.done
          }
        }
        return todo
      })
    },
    deleteAllTodoDone: (state) => {
      state.todoList = state.todoList.filter((todo) => !todo.done)
    },
    completedAllTodo: (state) => {
      const allDone = state.todoList.every((todo) => todo.done)
      state.todoList.forEach((todo) => {
        todo.done = !allDone
      })
    }
  }
})

export const { addTodo, deleteTodo, updateTodo, doneTodo, deleteAllTodoDone, completedAllTodo } = listSlice.actions
export default listSlice.reducer
