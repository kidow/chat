import { atom } from 'recoil'

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null
})

export const backdropState = atom<boolean>({
  key: 'backdropState',
  default: false
})

export const isLoginOpenState = atom<boolean>({
  key: 'isLoginOpenState',
  default: false
})