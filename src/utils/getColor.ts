export type ColorType = 'black' | 'white' | 'orange' | 'blue' | 'gray' | 'transparent'

export const getColor = (color: ColorType) => {
  return `var(--${color})`
}
