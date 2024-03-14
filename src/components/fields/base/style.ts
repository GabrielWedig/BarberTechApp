import styled from 'styled-components'

interface FieldProps {
  disabled: boolean
}

export const FieldBox = styled.div<FieldProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  width: 100%;

  .MuiMenuItem-root {
    font-family: 'Poppins';
  }

  .error {
    border: 1px solid var(--red);
    margin-bottom: 0;
  }

  input, textarea {
    font-family: 'Poppins';
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--gray);
    font-size: 17px;
  }

  input:focus, textarea {
    outline: none;
  }

  input:disabled {
    background-color: var(--white);
  }

  fieldset {
    border: none;
  }
`

export const Label = styled.label`
  color: var(--white);
  font-size: 17px;
`
