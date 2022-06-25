import { EventListener } from 'services'

export const enumToOptions = (enumObj: any) =>
  Object.entries<string>(enumObj).map(([name, value]) => ({ value, name }))

export const toast = {
  success: (message: string) => EventListener.emit<string>('toast', message),
  info: (message: string) => EventListener.emit<string>('toast', message),
  warn: (message: string) => EventListener.emit<string>('toast', message),
  error: (message: string) => EventListener.emit<string>('toast', message)
}
