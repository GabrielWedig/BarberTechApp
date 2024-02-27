export type ColorType =
  | 'black'
  | 'white'
  | 'orange'
  | 'orange50'
  | 'blue'
  | 'gray'
  | 'transparent'

export const getColor = (color: ColorType) => {
  return `var(--${color})`
}
