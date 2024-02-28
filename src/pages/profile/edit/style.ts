import styled from 'styled-components'

interface UserPhotoProps {
  url: string
}

export const EditBox = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 25px;

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 30%;
  }

  .rigth-column {
    width: 65%;
  }

  .photo-button {
    border-radius: 100%;
    border: 5px solid var(--white);
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: var(--orange);
    bottom: 0;
    right: 0;
  }

  .photo-button > svg {
    color: var(--white);
  }

  label {
    color: var(--black);
  }

  p {
    width: 60%;
    text-align: center;
    color: var(--black);
  }
`

export const UserPhoto = styled.div<UserPhotoProps>`
  width: 250px;
  height: 250px;
  border-radius: 100%;
  background: url(${(props) => props.url}) center / cover no-repeat;
  position: relative;
`
