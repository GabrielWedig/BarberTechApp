import styled from 'styled-components'

export const Header = styled.header`
    width: 100%;
    height: auto;
    padding: 25px 50px;
    background-color: var(--black);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 3;

    button {
        margin: 0 8px;
    }
`