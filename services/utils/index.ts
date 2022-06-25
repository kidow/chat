import { EventListener } from 'services'

export const enumToOptions = (enumObj: any) =>
  Object.entries<string>(enumObj).map(([name, value]) => ({ value, name }))

export const toast = {
  success: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'success' }),
  info: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'info' }),
  warn: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'warn' }),
  error: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'error' })
}
