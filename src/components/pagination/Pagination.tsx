import { Stack } from '@mui/material'
import { useState } from 'react'
import * as S from './style'
import { ColorType } from '../../utils'
import { Visible } from '..'

interface PaginationProps {
  totalCount: number
  pageSize: number
  paginationColor?: ColorType
  handleChange: (page: number) => void
}

export const Pagination = ({
  totalCount,
  pageSize,
  paginationColor = 'blue',
  handleChange
}: PaginationProps) => {
  const [page, setPage] = useState<number>(1)

  const handlePaginationChange = (page: number) => {
    setPage(page)
    handleChange(page)
  }

  const count = Math.floor(totalCount / pageSize) + 1

  return (
    <Visible when={totalCount > pageSize}>
      <Stack spacing={2}>
        <S.StyledPagination
          paginationcolor={paginationColor}
          count={count}
          page={page}
          onChange={(_, page) => handlePaginationChange(page)}
        />
      </Stack>
    </Visible>
  )
}
