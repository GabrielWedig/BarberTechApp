import styled from 'styled-components'

interface SwiperBoxProps {
  borderColor: string
}

export const SwiperBox = styled.div<SwiperBoxProps>`
  .slick-list {
    padding: 20px;
  }

  .slick-slide {
    margin: 0 5px;
  }

  .border-right,
  .border-left {
    position: absolute;
    width: 50px;
    height: 100%;
    top: 0;
    z-index: 1;
  }

  .border-left {
    left: 0;
    background: linear-gradient(
      to right,
      ${(props) => props.borderColor},
      transparent
    );
  }

  .border-right {
    right: 0;
    background: linear-gradient(
      to left,
      ${(props) => props.borderColor},
      transparent
    );
  }
`
