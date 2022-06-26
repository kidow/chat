import { EventListener } from 'services'

export const enumToOptions = (enumObj: any) =>
  Object.entries<string>(enumObj).map(([name, value]) => ({ value, name }))

export const toast = {
  success: (message: string, options?: Omit<NToast.Emit, 'message' | 'type'>) =>
    EventListener.emit<NToast.Emit>('toast', {
      message,
      type: 'success',
      position: options?.position || 'top-right'
    }),
  info: (message: string, options?: Omit<NToast.Emit, 'message' | 'type'>) =>
    EventListener.emit<NToast.Emit>('toast', {
      message,
      type: 'info',
      position: options?.position || 'top-right'
    }),
  warn: (message: string, options?: Omit<NToast.Emit, 'message' | 'type'>) =>
    EventListener.emit<NToast.Emit>('toast', {
      message,
      type: 'warn',
      position: options?.position || 'top-right'
    }),
  error: (message: string, options?: Omit<NToast.Emit, 'message' | 'type'>) =>
    EventListener.emit<NToast.Emit>('toast', {
      message,
      type: 'error',
      position: options?.position || 'top-right'
    })
}
