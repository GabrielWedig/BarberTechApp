import styled, { keyframes } from 'styled-components'
import { MenuType } from '..'

interface UserPhotoProps {
  $url: string
}

interface MenuProps {
  $showMenu: MenuType
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
  background: url(${(props) => props.$url}) center / cover no-repeat;
`

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

export const Menu = styled.div<MenuProps>`
  position: fixed;
  padding: 25px;
  background-color: var(--blue);
  top: -30px;
  right: 0;
  animation: ${({ $showMenu }) => animation($showMenu)} 0.5s ease forwards;
  z-index: 4;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0 15px;
  filter: var(--dropShadow);

  .row {
    display: flex;
    gap: 10px;
    width: 200px;
    background-color: transparent;
    border: none;
    color: var(--white);
    font-size: 16px;
    margin: 5px 0;
  }
`

const animation = (showMenu: MenuType) => {
  if (showMenu === 'active') return slideDown
  if (showMenu === 'inactive') return slideUp
  else return null
}
