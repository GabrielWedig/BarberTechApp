import { useState } from 'react'

export const useArrayState = <T>(initialState: T[] = []) => {
  const [state, setState] = useState<T[]>(initialState)

  const add = (newValue: T) => {
    setState((current) => [...current, newValue])
  }

  const remove = (index: number) => {
    setState((current) => [...current].splice(index, 1))
  }

  const set = (newArray: T[]) => {
    setState(newArray)
  }

  return { state, add, remove, set }
}
