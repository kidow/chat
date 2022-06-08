import classnames from 'classnames'
import { Spinner } from 'components'
import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  theme?: 'danger' | 'primary' | 'success'
  shape?: 'text' | 'contained' | 'outlined'
}

const Button: FC<Props> = ({
  loading = false,
  size = 'md',
  theme,
  children,
  disabled,
  className,
  shape = 'contained',
  ...props
}) => {
  return (
    <button
      {...props}
      className={classnames(
        'group select-none font-medium leading-6 transition duration-150 ease-in-out disabled:cursor-not-allowed',
        {
          'inline-flex items-center justify-center': loading,
          'hover:brightness-105 active:brightness-90': !loading && !disabled,
          'rounded py-px px-2 text-xs': size === 'xs',
          'py-1 px-3 text-sm': size === 'sm',
          'py-2 px-4 text-base': size === 'md',
          'py-3 px-5 text-lg': size === 'lg',
          'bg-gray-900 text-white': !theme && shape === 'contained',
          'bg-red-600 text-white': theme === 'danger' && shape === 'contained',
          'bg-blue-500 text-white':
            theme === 'primary' && shape === 'contained',
          'bg-emerald-500 text-white':
            theme === 'success' && shape === 'contained',
          'disabled:bg-gray-300 disabled:text-white':
            shape === 'contained' && (loading || disabled),
          'bg-transparent hover:bg-gray-200': shape === 'text',
          'text-red-600': theme === 'danger' && shape === 'text',
          'text-blue-500': theme === 'primary' && shape === 'text',
          'text-emerald-500': theme === 'success' && shape === 'text',
          'border hover:text-white': shape === 'outlined',
          'border-gray-500 bg-white text-gray-500 hover:bg-gray-900':
            !theme && shape === 'outlined',
          'border-blue-500 text-blue-500 hover:bg-blue-500':
            theme === 'primary' && shape === 'outlined',
          'border-red-500 text-red-500 hover:bg-red-500':
            theme === 'danger' && shape === 'outlined',
          'border-emerald-500 text-emerald-500 hover:bg-emerald-500':
            theme === 'success' && shape === 'outlined',
          'rounded-md': size !== 'xs'
        },
        className
      )}
      disabled={loading || disabled}
    >
      {loading && (
        <Spinner
          className={classnames('-ml-1 mr-3 h-5 w-5', {
            'text-white': shape === 'contained',
            'group-hover:text-white': shape === 'outlined',
            'text-gray-900':
              (shape === 'outlined' && !theme) || shape === 'text',
            'text-blue-500': shape === 'outlined' && theme === 'primary',
            'text-red-500': shape === 'outlined' && theme === 'danger',
            'text-emerald-500': shape === 'outlined' && theme === 'success'
          })}
        />
      )}
      {children}
    </button>
  )
}

export default Button
