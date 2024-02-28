import { Tab, Tabs as MuiTabs } from '@mui/material'
import { TabSx, TabsSx } from './style'

interface TabsProps {
  items: Item[]
  onChange: (value: string) => void
  tab: string
}

interface Item {
  label: string
  value: string
}

export const Tabs = ({ items, tab, onChange }: TabsProps) => {
  return (
    <MuiTabs sx={TabsSx} value={tab} onChange={(_, value) => onChange(value)}>
      {items.map((item) => (
        <Tab label={item.label} sx={TabSx} value={item.value}/>
      ))}
    </MuiTabs>
  )
}
