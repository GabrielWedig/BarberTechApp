import styled from 'styled-components'

interface UserPhotoProps {
  url: string
}

export const BackgroundOrange = styled.div`
  height: 250px;
  background-color: var(--orange);
  margin-top: 98px;
`

export const BackgroundWhite = styled.div`
  height: calc(100vh - 348px);
  background-color: var(--white);
`

export const ProfileContainer = styled.section`
  position: absolute;
  top: 150px;
  left: 7.5%;
  z-index: 1;
  border: 2px solid var(--orange);
  height: 100vh;
  width: 85%;
  background-color: var(--white);

  .header {
    padding: 40px 100px;
    display: flex;
    align-items: center;
    gap: 50px;
    border-bottom: 1px solid var(--orange);
  }

  .header > button {
    margin-left: auto;
  }
`

export const UserPhoto = styled.div<UserPhotoProps>`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background: url(${(props) => props.url}) center / cover no-repeat;
`
