import type { FC } from 'react'
import { XIcon } from '@heroicons/react/solid'
import classnames from 'classnames'
import { Portal } from 'components'

import LoginModal from './Login'
import MyInfoModal from './MyInfo'
import AgreeToTermsModal from './AgreeToTerms'
import CodeEditorModal from './CodeEditor'

interface Props extends ModalProps {}
interface IModal extends FC<Props> {
  Login: typeof LoginModal
  MyInfo: typeof MyInfoModal
  AgreeToTerms: typeof AgreeToTermsModal
  CodeEditor: typeof CodeEditorModal
}
interface State {}

const Modal: IModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  title,
  description,
  padding = true,
  footer
}) => {
  if (!isOpen) return null
  return (
    <Portal role="dialog">
      <div
        className="fixed inset-0 z-30 overflow-y-auto"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-end justify-center p-0 text-center md:block">
          <div
            className="fixed inset-0 bg-black opacity-30 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          ></div>
          <span
            className="hidden h-screen align-middle md:inline-block"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={classnames(
              `my-8 inline-block w-full transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all`,
              maxWidth
            )}
          >
            <header className="border-t-4 border-gray-800 bg-white">
              {!!title && (
                <div
                  className={classnames(
                    'flex border-b border-gray-200 p-4',
                    !!description ? 'items-start' : 'items-center'
                  )}
                >
                  <div className="flex-1">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    {!!description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-gray-300"
                  >
                    <XIcon className="h-5 w-5 text-gray-800" />
                  </button>
                </div>
              )}
            </header>
            <div
              className={classnames('bg-white', {
                'py-6 px-7': padding
              })}
            >
              {children}
            </div>
            {footer && (
              <footer className="border-t bg-white py-4 px-7">{footer}</footer>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.Login = LoginModal
Modal.MyInfo = MyInfoModal
Modal.AgreeToTerms = AgreeToTermsModal
Modal.CodeEditor = CodeEditorModal

export default Modal
