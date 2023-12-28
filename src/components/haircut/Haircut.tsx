import * as S from './style'

interface HaircutProps {
  name: string
  price: number
  photo: string
  description?: string
}

export const Haircut = ({ name, price, photo, description }: HaircutProps) => {
  console.log(photo)
  return (
    <S.Haircut>
      <img src={photo} alt="haircut-photo" />
      <div className="footer">
        <span>{name}</span>
        <span>{price}</span>
      </div>
    </S.Haircut>
  )
}
