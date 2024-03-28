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

  .error {
    border: 1px solid var(--red) !important;
    margin-bottom: 0;
    border-radius: 8px;
  }

  input,
  textarea,
  .MuiInputBase-root {
    font-family: 'Poppins';
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--gray);
    font-size: 17px;
    background-color: var(--white);
  }

  .MuiSelect-select,
  .MuiInputBase-root > input {
    padding: 0 !important;
  }

  .MuiAutocomplete-noOptions {
    font-family: 'Poppins';
    background-color: red;
  }

  .MuiFormControl-root > div {
    padding: 10px 20px;
  }

  .MuiAutocomplete-endAdornment {
    top: -12px;
    margin-left: 10px;
  }

  input:focus,
  textarea {
    outline: none;
  }

  input::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  fieldset,
  .MuiInputBase-input {
    border: none;
  }
`

export const Label = styled.label`
  color: var(--white);
  font-size: 17px;
`
