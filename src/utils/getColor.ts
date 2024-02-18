export type ColorType = 'black' | 'white' | 'orange' | 'blue' | 'gray'

export const getColor = (color: ColorType) => {
  return `var(--${color})`
}
