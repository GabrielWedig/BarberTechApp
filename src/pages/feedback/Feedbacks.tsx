import { useEffect, useState } from 'react'
import { FeedbackCard, Footer, Header, Snackbar } from '../../components'
import contentJson from '../../content.json'
import * as S from './style'
import {
  FeedbacksData,
  useFeedbacks,
  useSnackbarContext,
  usingTryCatch
} from '../../hooks'
import feedbacksImage from '../../img/feedbacks.jpg'
import { scrollToSection } from '../../utils'
import { useLocation } from 'react-router-dom'

export const Feedbacks = () => {
  const content = contentJson.feedback
  const pageSize = 5

  const [feedbacks, setFeedbacks] = useState<FeedbacksData[]>([])

  const { getAllFeedbacks } = useFeedbacks()
  const { showErrorSnackbar } = useSnackbarContext()

  const location = useLocation()

  useEffect(() => {
    scrollToSection(location.state, false)
    fetchFeedbacks(1)
  }, [])

  const fetchFeedbacks = async (page: number) => {
    const { data, error } = await usingTryCatch(getAllFeedbacks(page, pageSize))

    if (error || !data) {
      showErrorSnackbar(error)
      return
    }
    setFeedbacks(data.items)
  }

  return (
    <>
      <Header />
      <S.FeedbackContainer id="feedbacks">
        <div className="column">
          <div className="tab">
            <span></span>
            <span>{content.tab}</span>
          </div>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <img src={feedbacksImage} alt="barber with client" />
        </div>
        <div className="column">
          {feedbacks.map((f) => (
            <FeedbackCard
              comment={f.comment}
              stars={f.ratingAverage}
              user={f.userName}
              at={f.at}
            />
          ))}
        </div>
      </S.FeedbackContainer>
      <Footer />
      <Snackbar />
    </>
  )
}
