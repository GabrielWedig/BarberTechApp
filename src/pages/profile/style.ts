import styled from 'styled-components'

interface UserPhotoProps {
  url: string
}

export const Background = styled.div`
  height: 100%;
  background: linear-gradient(
    var(--orange) 0,
    var(--orange) 300px,
    var(--white) 300px,
    var(--white) 100%
  );
  margin-top: 98px;
  padding: 50px 0;
`

export const ProfileContainer = styled.section`
  border: 2px solid var(--orange);
  height: auto;
  width: 70%;
  background-color: var(--white);
  margin: 0 auto;

  .header {
    width: 100%;
    padding: 30px 100px;
    display: flex;
    align-items: center;
    gap: 100px;
  }

  .content {
    padding: 0 100px;
  }

  button > span {
    margin-right: 10px;
  }
`

export const UserPhoto = styled.div<UserPhotoProps>`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background: url(${(props) => props.url}) center / cover no-repeat;
`
