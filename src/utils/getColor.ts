export type ColorType =
  | 'black'
  | 'white'
  | 'orange'
  | 'orange50'
  | 'blue'
  | 'gray'
  | 'light-gray'
  | 'transparent'

export const getColor = (color: ColorType) => {
  return `var(--${color})`
}
