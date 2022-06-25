import { SEO } from 'components'
import type { NextPage } from 'next'
import { toast as retoast } from 'react-toastify'
import { toast } from 'services'

interface State {}

const HomePage: NextPage = () => {
  return (
    <>
      <SEO title="개발자들이 일상을 나누는 곳." />
      <div className="flex h-full items-center justify-center gap-4">
        <button
          onClick={() =>
            retoast.success('성공', {
              autoClose: false,
              position: 'bottom-right'
            })
          }
        >
          Toast
        </button>
        <button
          onClick={() =>
            toast.success(`${Math.random().toString(36).slice(2)}`)
          }
        >
          Success
        </button>
        <button
          onClick={() => toast.info(`${Math.random().toString(36).slice(2)}`)}
        >
          Info
        </button>
        <button
          onClick={() => toast.warn(`${Math.random().toString(36).slice(2)}`)}
        >
          Warn
        </button>
        <button
          onClick={() => toast.error(`${Math.random().toString(36).slice(2)}`)}
        >
          Error
        </button>
      </div>
    </>
  )
}

export default HomePage
