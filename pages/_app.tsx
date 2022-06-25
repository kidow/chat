import 'styles/globals.css'
import App from 'next/app'
import { ErrorInfo } from 'react'
import { Backdrop } from 'components'
import { Layout, Auth, Toast } from 'containers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'
import 'dayjs/locale/ko'

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
        <ToastContainer position="top-center" autoClose={3000} theme="light" />
        <Toast />
      </>
    )
  }
}

export default MyApp
