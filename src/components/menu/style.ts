import styled from 'styled-components'

interface UserPhotoProps {
  url: string
}

export const UserMenuBox = styled.button`
  display: flex;
  gap: 20px;
  background-color: transparent;
  border: none;
  font-size: 16px;

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  span {
    color: var(--white);
  }

  span:first-child {
    font-size: 14px;
  }
`

export const UserPhoto = styled.div<UserPhotoProps>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: url(${(props) => props.url}) center / cover no-repeat;
`
