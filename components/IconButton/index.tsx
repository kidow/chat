import { cloneElement, useMemo } from 'react'
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
  ReactNode
} from 'react'
import classnames from 'classnames'

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
}

const IconButton: FC<Props> = ({ children, className, ...props }) => {
  const clone = useMemo(
    () =>
      cloneElement(children as ReactElement, {
        className: 'text-gray-400 h-4 w-4 group-hover:text-gray-700'
      }),
    [children]
  )
  return (
    <button
      {...props}
      className={classnames(
        'group flex items-center justify-center rounded-full border border-gray-300 bg-white p-2 hover:border-gray-700 disabled:cursor-not-allowed',
        className
      )}
    >
      {clone}
    </button>
  )
}

export default IconButton