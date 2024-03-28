import styled from 'styled-components'

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;

  h3 {
    color: var(--white);
    font-size: 28px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  form > button {
    margin-top: 20px;
  }

  div > span {
    color: var(--gray);
    margin-right: 10px;
  }

  div > a {
    color: var(--orange);
    text-decoration: underline;
  }
`
