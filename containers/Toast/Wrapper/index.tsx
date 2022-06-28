import type { FC } from 'react'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

export interface Props extends ReactProps {
  position: NToast.Position
}
interface State {}

const ToastWrapper: FC<Props> = ({ position, children }) => {
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
        {children}
      </div>
    </div>,
    document.body
  )
}

export default ToastWrapper
