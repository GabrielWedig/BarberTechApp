import { useState } from 'react'

export const useArrayState = <T>(initialState: T[] = []) => {
  const [state, setState] = useState<T[]>(initialState)

  const add = (newValue: T) => {
    setState((current) => [...current, newValue])
  }

  const remove = (index: number) => {
    setState((current) => {
      const newState = [...current]
      newState.splice(index, 1)
      return newState
    })
  }

  const reset = (newArray: T[]) => {
    setState(newArray)
  }

  return { state, add, remove, reset }
}
