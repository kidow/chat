import { SEO } from 'components'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { toast as retoast } from 'services'

interface State {}

const HomePage: NextPage = () => {
  return (
    <>
      <SEO title="개발자들이 일상을 나누는 곳." />
      <div className="flex h-full items-center justify-center gap-4">
        <button
          onClick={() =>
            toast.success('성공', { autoClose: false, position: 'top-right' })
          }
        >
          Toast
        </button>
        <button onClick={() => retoast.success('ReToast')}>ReToast!</button>
      </div>
    </>
  )
}

export default HomePage
