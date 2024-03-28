import { Pagination, styled } from '@mui/material'
import { ColorType, getColor } from '../../utils'

interface PaginationProps {
  paginationcolor: ColorType
}

export const StyledPagination = styled(Pagination)<PaginationProps>(
  (props: PaginationProps) => ({
    '& li button': {
      fontFamily: 'Poppins',
      color: getColor(props.paginationcolor)
    }
  })
)
