import styled from 'styled-components'

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--gray);
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px 20px;
  width: max-content;

  .null {
    color: var(--gray);
    font-style: italic;
    font-size: 12px;
  }

  span {
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    background-color: transparent;
    border: none;
  }
`
