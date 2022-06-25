type TMaxWidth =
  | 'max-w-screen-2xl'
  | 'max-w-screen-xl'
  | 'max-w-screen-lg'
  | 'max-w-screen-md'
  | 'max-w-screen-sm'
  | 'max-w-full'
  | 'max-w-8xl'
  | 'max-w-7xl'
  | 'max-w-6xl'
  | 'max-w-5xl'
  | 'max-w-4xl'
  | 'max-w-3xl'
  | 'max-w-2xl'
  | 'max-w-xl'
  | 'max-w-lg'
  | 'max-w-md'
  | 'max-w-sm'
  | 'max-w-xs'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /**
   * @default 'max-w-lg'
   */
  maxWidth?: TMaxWidth
  description?: ReactNode
  padding?: boolean
  footer?: ReactNode
}

interface IUser {
  id: string
  email: string
  avatar_url: string
  nickname: string
  created_at: string
  last_sign_in_at: string
  provider: string
}

interface DialogProps {
  onClose?: () => void
  title?: string
  description?: string
  padding?: boolean
  footer?: ReactNode
  /**
   * @default 'max-w-lg'
   */
  maxWidth?: TMaxWidth
  children?: ReactNode
}

interface ToastProps {
  message: string
}
