import type { NextPageContext } from 'next'
import type { FC } from 'react'

interface Props {
  statusCode: number
}
interface State {}

const ErrorPage: FC<Props> = ({ statusCode }) => {
  return <>{statusCode} 죄송합니다. 다시 시도하여 주십시오.</>
}

// @ts-ignore
ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
