import styled from 'styled-components'

export const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

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
  }

  button {
    margin-top: 20px;
  }
`
