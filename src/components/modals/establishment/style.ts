import styled from 'styled-components'

export const EstablishmentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: var(--white);
    font-size: 28px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 20px 0;
  }

  button {
    margin-top: 20px;
  }

  .box {
    display: flex;
    gap: 10px;
  }

  .box > div {
    width: 50%;
  }
`
