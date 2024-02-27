import { Tab, Tabs as MuiTabs } from '@mui/material'
import { useState } from 'react'
import { TabSx, TabsSx } from './style'
import { TabValues } from '../../pages/profile/tabs'

interface TabsProps {
  items: Item[]
  onChange: (value: TabValues) => void
  tab: string
}

interface Item {
  name: string // TODO: mudar para tab names
  value: TabValues
}

export const Tabs = ({ items, tab, onChange }: TabsProps) => {
  return (
    <MuiTabs sx={TabsSx} value={tab} onChange={(_, value) => onChange(value)}>
      {items.map((item) => (
        <Tab label={item.name} sx={TabSx} value={item.value}/>
      ))}
    </MuiTabs>
  )
}
