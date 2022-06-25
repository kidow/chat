import { useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from 'containers'
import { EventListener, useObjectState } from 'services'
import classnames from 'classnames'

export interface Props {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
}
interface State {
  list: ToastProps[]
}

const ToastContainer: FC<Props> = ({ position = 'bottom-left' }) => {
  const [{ list }, setState] = useObjectState<State>({ list: [] })

  const onMessage = useCallback(
    ({ detail }: any) => {
      console.log('list', list)
      setState({ list: [...list, { message: detail.message }] })
    },
    [list.length]
  )

  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list.length])

  if (!list.length) return null
  return createPortal(
    <div role="alertdialog">
      <div
        className={classnames('fixed space-y-4', {
          'top-4':
            position === 'top-left' ||
            position === 'top-center' ||
            position === 'top-right',
          'right-4': position === 'top-right' || position === 'bottom-right',
          'left-4': position === 'top-left' || position === 'bottom-left',
          'left-1/2 -translate-x-1/2':
            position === 'top-center' || position === 'bottom-center',
          'bottom-4':
            position === 'bottom-left' ||
            position === 'bottom-center' ||
            position === 'bottom-right'
        })}
      >
        {list.map((item, key) => (
          <Toast
            key={key}
            message={item.message}
            onRemove={() =>
              setState({ list: list.filter((_, i) => i !== key) })
            }
          />
        ))}
      </div>
    </div>,
    document.body
  )
}

export default ToastContainer
