import { Button, styled } from '@mui/material'
import { colors } from '../../constants'

const CommonButton = styled(Button)({
  fontFamily: 'Poppins',
  fontSize: '17px',
  cursor: 'pointer',
  fontWeight: '300',
  textTransform: 'none'
})

export const PrimaryButton = styled(CommonButton)({
  backgroundColor: colors.orange,
  color: colors.black,
  padding: '10px 60px',
  borderRadius: '8px',
  fontWeight: '400',
  fontSize: '16px'
})

export const TransparentButton = styled(CommonButton)({
  backgroundColor: 'transparent',
  color: colors.white
})

export const TransparentActiveButton = styled(TransparentButton)({
  color: colors.orange
})
