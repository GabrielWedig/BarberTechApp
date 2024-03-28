import styled from 'styled-components'

export const Footer = styled.footer`
  padding: 100px 200px;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  justify-content: space-between;

  .column {
    width: 20%;
  }

  h3,
  .logo {
    margin-bottom: 20px;
  }

  .social-box {
    margin-top: 30px;
    display: flex;
    gap: 20px;
  }

  .social-icon {
    border: none;
    background-color: var(--white);
    border-radius: 100%;
    color: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .contact {
    display: flex;
    align-items: center;
    margin: 15px 0;
  }

  .contact > svg {
    color: var(--orange);
    margin-right: 10px
  }
`
