import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { EventListener } from 'services'
import classnames from 'classnames'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon
} from '@heroicons/react/solid'
import ToastContainer from './Container'
import ToastWrapper from './Wrapper'

export interface Props {
  id: string
  message: string
  type: NToast.Type
  position?: NToast.Position
  autoClose?: number | false
  pauseOnHover?: boolean
}
interface IToast extends FC<Props> {
  Container: typeof ToastContainer
  Wrapper: typeof ToastWrapper
}
interface State {}

const Toast: IToast = ({
  id,
  message,
  type,
  autoClose = 3000,
  position = 'top-right',
  pauseOnHover = true,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const onRemove = () => EventListener.emit('toast', { id })

  useEffect(() => {
    if (!autoClose) return
    ref.current?.addEventListener('animationend', onRemove)
    return () => ref.current?.removeEventListener('animationend', onRemove)
  }, [autoClose])

  return (
    <div
      className={classnames(
        'relative z-[9999] w-80 cursor-pointer rounded bg-white p-2',
        {
          'animate-bounce-in-right':
            position === 'top-right' || position === 'bottom-right',
          'animate-bounce-in-left':
            position === 'top-left' || position === 'bottom-left',
          'animate-bounce-in-up': position === 'bottom-center',
          'animate-bounce-in-down': position === 'top-center',
          group: pauseOnHover
        }
      )}
      id={id}
      onClick={onRemove}
      style={{
        boxShadow: '0 1px 10px 0 rgb(0 0 0 / 10%), 0 2px 15px 0 rgb(0 0 0 / 5%)'
      }}
    >
      <div className="relative flex items-start">
        <div className="flex flex-1 items-center">
          <div
            role="alert"
            className="my-1.5 flex flex-1 items-center gap-2.5 py-1.5"
          >
            <span>
              {type === 'success' && (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              )}
              {type === 'info' && (
                <InformationCircleIcon className="h-6 w-6 text-blue-500" />
              )}
              {type === 'warn' && (
                <ExclamationIcon className="h-6 w-6 text-amber-500" />
              )}
              {type === 'error' && (
                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </span>
            <div className="flex-1 text-neutral-500">{message}</div>
          </div>
        </div>
        <button>
          <XIcon className="h-4 w-4 text-neutral-400" />
        </button>
      </div>
      {autoClose && (
        <div
          ref={ref}
          role="progressbar"
          className={classnames(
            'absolute bottom-0 left-0 h-[5px] w-full origin-left animate-progress rounded-bl',
            {
              'bg-green-500': type === 'success',
              'bg-blue-500': type === 'info',
              'bg-amber-500': type === 'warn',
              'bg-red-500': type === 'error',
              'group-hover:animate-play-paused': pauseOnHover
            }
          )}
          style={{ animationDuration: `${autoClose + 700}ms` }}
        ></div>
      )}
    </div>
  )
}

Toast.Container = ToastContainer
Toast.Wrapper = ToastWrapper

export default Toast
