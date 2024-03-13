import styled from 'styled-components'

export const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .box {
    display: flex;
    gap: 20px;
  }

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
`
