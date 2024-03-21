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
    align-items: center;
    gap: 40px;
    width: 30%;
  }

  .rigth-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 65%;
  }

  .rigth-column > button {
    width: 30%;
  }

  label {
    color: var(--black);
  }

  p {
    width: 80%;
    color: var(--gray);
    text-align: center;
  }
`

export const UserPhoto = styled.div<UserPhotoProps>`
  width: 250px;
  height: 250px;
  border-radius: 100%;
  background: url(${(props) => props.url}) center / cover no-repeat;
  position: relative;

  label {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`
