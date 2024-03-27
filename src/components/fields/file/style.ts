import styled from 'styled-components'

interface FileInputProps {
  disabled: boolean
}

export const FileInput = styled.div<FileInputProps>`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  flex-direction: column;
  gap: 5px;

  .primary {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--white);
    cursor: pointer;
    font-size: 17px;
    border: 1px solid var(--gray);
    height: 48px;
  }

  .secondary {
    border-radius: 100%;
    border: 5px solid var(--white);
    width: 80px;
    height: 80px;
    background-color: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .secondary > svg {
    color: var(--white);
  }

  .label {
    color: var(--white);
  }

  input {
    display: none;
  }

  .error {
    border: 1px solid var(--red);
    color: var(--red);
    margin-bottom: 0;
  }

  .file-name {
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
