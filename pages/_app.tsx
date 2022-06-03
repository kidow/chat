import 'styles/globals.css'
import App from 'next/app'
import { ErrorInfo } from 'react'
import { Auth, Backdrop, Layout } from 'components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

interface Props {}
interface State {
  hasError: boolean
}

class MyApp extends App<Props, {}, State> {
  state = {
    hasError: false
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error) this.setState({ hasError: true })
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    const {} = this.state
    const { Component, pageProps } = this.props
    return (
      <>
        <RecoilRoot>
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
          <Backdrop />
        </RecoilRoot>
        <ToastContainer />
      </>
    )
  }
}

export default MyApp
