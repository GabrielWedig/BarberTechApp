import styled from 'styled-components'

export const InputBox = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Label = styled.label`
  color: var(--white);
  font-size: 17px;
`

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 17px;

  &:focus {
    outline: none;
  }
`
