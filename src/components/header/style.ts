import styled, { keyframes } from 'styled-components'

interface MenuProps {
  showMenu: boolean
}

export const Header = styled.header`
  width: 100%;
  height: auto;
  padding: 25px 50px;
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 5;
  filter: var(--dropShadow);

  button {
    margin: 0 8px;
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`

export const Menu = styled.div<MenuProps>`
  position: fixed;
  padding: 25px;
  background-color: var(--blue);
  top: 98px;
  right: 0;
  animation: ${({ showMenu }) => (showMenu ? slideDown : slideUp)} 0.5s ease
    forwards;
  z-index: 4;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0 15px;

  button {
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
