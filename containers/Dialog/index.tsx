import { forwardRef } from 'react'
import { XIcon } from '@heroicons/react/solid'
import classnames from 'classnames'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'

interface Props extends DialogProps {}

const Dialog = forwardRef<HTMLDialogElement, Props>(
  (
    {
      onClose,
      title,
      description,
      padding = true,
      footer,
      maxWidth = 'max-w-lg',
      ...props
    },
    ref
  ) => {
    return createPortal(
      <dialog
        ref={ref}
        className={classnames(
          'w-full rounded-lg p-0 backdrop:bg-black backdrop:opacity-30',
          maxWidth
        )}
        onClick={(e) => {
          // @ts-ignore
          if (e.target === ref.current) {
            if (onClose) onClose()
            // @ts-ignore
            else ref.current?.close()
          }
        }}
        {...props}
      >
        <header className="border-t-4 border-gray-800">
          {!!title && (
            <div
              className={classnames(
                'flex border-b border-neutral-200 p-4',
                !!description ? 'items-start' : 'items-center'
              )}
            >
              <div className="flex-1">
                <h1 className="text-lg font-semibold">{title}</h1>
                {!!description && (
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
              </div>
              <button
                // @ts-ignore
                onClick={() => ref.current?.close()}
                className="rounded-full p-2 hover:bg-gray-300"
              >
                <XIcon className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          )}
        </header>
        <div className={classnames({ 'py-6 px-7': padding })}>
          {props.children}
        </div>
        {!!footer && (
          <footer className="border-t border-neutral-200 p-4">{footer}</footer>
        )}
      </dialog>,
      document.body
    )
  }
)

export default dynamic<Props>(
  () =>
    Promise.resolve(({ ...props }) =>
      createPortal(<Dialog {...props} />, document.body)
    ),
  { ssr: false }
)
