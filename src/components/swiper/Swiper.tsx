import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as S from './style'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface SwiperProps {
  children: React.ReactNode
}

export const Swiper = ({ children }: SwiperProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    nextArrow: (
      <ArrowForwardIosIcon sx={{ color: 'var(--orange)' }} fontSize="large" />
    ),
    prevArrow: (
      <ArrowBackIosNewIcon sx={{ color: 'var(--orange)' }} fontSize="large" />
    )
  }

  return (
    <S.SwiperBox>
      <div className="border-left"></div>
      <Slider {...settings}>{children}</Slider>
      <div className="border-right"></div>
    </S.SwiperBox>
  )
}
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  )
}
