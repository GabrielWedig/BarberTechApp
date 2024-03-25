import styled from 'styled-components'

export const DayBox = styled.div`
  border: 1px solid var(--gray);
  width: 260px;
  height: 200px;

  .schedules {
    padding: 0 10px;
    height: 80%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .day {
    padding: 0 10px;
    height: 20%;
    display: flex;
    align-items: center;
    font-weight: 600;
    border-bottom: 1px solid var(--gray);
  }

  ::-webkit-scrollbar {
    display: none;
  }
`
