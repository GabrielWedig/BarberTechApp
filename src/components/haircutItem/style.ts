import styled from 'styled-components'

interface ImageProps {
  url: string
}

export const HaircutItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  border: 1px solid var(--gray);

  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
  }

  .date {
    color: var(--orange);
  }

  .names {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .names > span {
    margin-bottom: 15px;
  }

  .barber {
    color: #a1a5b3;
  }

  .btn {
    margin-right: 18px;
  }
`

export const Image = styled.div<ImageProps>`
  width: 130px;
  height: 100px;
  background: url(${(props) => props.url}) center / cover no-repeat;
  position: relative;
`
