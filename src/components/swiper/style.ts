import styled from 'styled-components'

export const SwiperBox = styled.div`
  position: relative;

  .slick-list {
    padding: 20px;
  }

  .border-right {
    position: absolute;
    width: 80px;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(254, 254, 254, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
  }

  .border-left {
    position: absolute;
    width: 80px;
    height: 100%;
    right: 0;
    top: 0;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(254, 254, 254, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
  }
`
