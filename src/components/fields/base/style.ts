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

  input {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-size: 17px;
    margin-bottom: 27px;
  }

  input:focus {
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
