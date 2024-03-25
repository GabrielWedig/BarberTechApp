import styled from 'styled-components'
import { getColor } from '../../utils'

interface ScheduleProps {
  hasClient: boolean
}

export const ScheduleBox = styled.div<ScheduleProps>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.hasClient ? getColor('light-gray') : getColor('white')};
  margin: 2px 0;
  padding: 2px 5px;
  font-family: 'Poppins';
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    text-overflow: ellipsis;
    color: ${(props) =>
      props.hasClient ? getColor('black') : getColor('gray')};
    font-style: ${(props) => (props.hasClient ? 'normal' : 'italic')};
    font-size: ${(props) => (props.hasClient ? '16px' : '13px')};
  }

  .buttons {
    display: flex;
  }

  .buttons > button {
    background-color: transparent;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
  }
`
