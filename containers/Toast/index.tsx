import { useEffect } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'
import { EventListener, useObjectState } from 'services'
import classnames from 'classnames'
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'

export interface Props {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  type?: 'success' | 'info' | 'warn' | 'error'
}
interface State {
  isOpen: boolean
}

const Toast: FC<Props> = ({ ...props }) => {
  const [{ isOpen }, setState] = useObjectState<State>({ isOpen: false })

  const onMessage = ({ detail }: any) => {
    console.log('detail', detail)
    setState({ isOpen: true })
  }

  useEffect(() => {
    EventListener.add('toast', onMessage)
    return () => EventListener.remove('toast', onMessage)
  }, [])
  if (!isOpen) return null
  return createPortal(
    <div role="alertdialog" className="space-y-4">
      <div
        className="fixed top-4 left-1/2 z-[9999] w-80 -translate-x-1/2 cursor-pointer rounded p-2 shadow-lg"
        onClick={() => setState({ isOpen: false })}
      >
        <div className="relative flex items-start">
          <div className="flex items-center">
            <div
              role="alert"
              className="my-1.5 flex flex-1 items-center gap-2.5 py-1.5"
            >
              <span>
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </span>
              <div className="flex-1 text-neutral-500">
                성공성공성공성공성공성공성공성공성공성공성공성공성공성공
              </div>
            </div>
          </div>
          <button>
            <XIcon className="h-4 w-4 text-neutral-400" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Toast
