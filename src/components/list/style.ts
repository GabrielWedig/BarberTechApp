import styled from 'styled-components'

export const ListBox = styled.div`
  margin: 30px 0;

  h3 {
    margin-bottom: 10px;
  }

  .filter-box {
    display: flex;
    gap: 25px;
    color: var(--black);
    margin-bottom: 20px;
  }

  .filter-box > div {
    width: 50%;
  }

  .table-header {
    padding: 0 20px;
    display: flex;
  }

  .table-header > span {
    padding: 0 5px;
    width: 160px;
  }

  .table-content {
    height: max-content;
  }
`
