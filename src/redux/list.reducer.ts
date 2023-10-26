import { Todo } from '../@types/todo.type'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { initialTodoList } from '../constants/list'

interface ListStage {
  todoList: Todo[]
  editingTodo: Todo | null
}

const initialState: ListStage = {
  todoList: initialTodoList,
  editingTodo: null
}

export const addTodo = createAction('todo/addTodo', function (todo: Omit<Todo, 'id'>) {
  return {
    payload: {
      ...todo,
      id: nanoid()
    }
  }
})
export const deleteTodo = createAction<string>('todo/deleteTodo')
export const updateTodo = createAction<Todo>('todo/updateTodo')
export const doneTodo = createAction<string>('todo/doneTodo')
export const deleteAllTodoDone = createAction('todo/deleteAllTodoDone')
export const completedAllTodo = createAction('todo/completedAllTodo')

const listReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.todoList.push(action.payload)
    })
    .addCase(deleteTodo, (state, action) => {
      const todoId = action.payload
      const foundTodoIndex = state.todoList.findIndex((todo) => todo.id === todoId)
      if (foundTodoIndex !== -1) {
        state.todoList.splice(foundTodoIndex, 1)
      }
    })
    .addCase(updateTodo, (state, action) => {
      state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            name: action.payload.name
          }
        }
        return todo
      })
    })
    .addCase(doneTodo, (state, action) => {
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
    })
    .addCase(deleteAllTodoDone, (state, action) => {
      state.todoList = state.todoList.filter((todo) => !todo.done)
    })
    .addCase(completedAllTodo, (state) => {
      const allDone = state.todoList.every((todo) => todo.done)
      state.todoList.forEach((todo) => {
        todo.done = !allDone
      })
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(state)
      }
    )
})

export default listReducer
