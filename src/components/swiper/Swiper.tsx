import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as S from './style'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ColorType, getColor } from '../../utils'

interface SwiperProps {
  children: React.ReactNode
  qntSlides: number
  borderColor: ColorType
  arrowColor: ColorType
  infinite?: boolean
}

export const Swiper = ({
  children,
  qntSlides,
  borderColor,
  arrowColor,
  infinite = true
}: SwiperProps) => {
  const settings = {
    infinite: infinite,
    slidesToShow: qntSlides,
    swipeToSlide: true,
    nextArrow: (
      <ArrowForwardIosIcon
        sx={{ fill: getColor(arrowColor), right: '-70px' }}
        fontSize="large"
      />
    ),
    prevArrow: (
      <ArrowBackIosNewIcon
        sx={{ fill: getColor(arrowColor), left: '-70px' }}
        fontSize="large"
      />
    )
  }

  return (
    <S.SwiperBox borderColor={getColor(borderColor)}>
      <div className="border-left"></div>
      <Slider {...settings}>{children}</Slider>
      <div className="border-right"></div>
    </S.SwiperBox>
  )
}
