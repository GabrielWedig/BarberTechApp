import styled from 'styled-components'

export const ButtonGroupBox = styled.div`
  position: relative;

  button {
    padding: 8px 30px;
    background-color: rgba(130, 130, 130, 0.1);
    color: white;
    border: 1px solid var(--gray);
    border-radius: 10px;
    font-size: 17px;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: rgba(240, 179, 91, 0.3);
    border: 1px solid var(--white);
  }
`
