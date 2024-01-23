import styled from 'styled-components'
import { colors } from '../../constants'

export const Header = styled.header`
    width: 100%;
    height: auto;
    padding: 25px 50px;
    background-color: ${colors.black.main};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 3;

    button {
        margin: 0 8px;
    }
`