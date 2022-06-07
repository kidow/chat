import { SEO } from 'components'
import type { NextPage } from 'next'

interface State {}

const HomePage: NextPage = () => {
  return (
    <>
      <SEO title="개발자들의 일상을 나누는 곳." />
    </>
  )
}

export default HomePage
