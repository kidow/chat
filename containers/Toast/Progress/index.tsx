import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { EventListener } from 'services'

export interface Props {
  type: NToast.Type
  pauseOnHover: boolean
  autoClose: number
  id: string
}
interface State {}

const ToastProgress: FC<Props> = ({ id, type, pauseOnHover, autoClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  const onRemove = () => EventListener.emit('toast', { id })

  useEffect(() => {
    ref.current?.addEventListener('animationend', onRemove)
    return () => ref.current?.removeEventListener('animationend', onRemove)
  }, [])
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label="notification timer"
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
    />
  )
}

export default ToastProgress
