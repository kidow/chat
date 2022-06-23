import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface State {}

const ErrorPage = () => {
  const { replace } = useRouter()
  useEffect(() => {
    console.log('500')
    replace('/')
  }, [])
  return <></>
}

export default ErrorPage
