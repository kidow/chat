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

export const roomListState = atom<Array<Table.Room & { chats: Array<Table.Chat & { user: Table.User }> }>>({
  key: 'roomListState',
  default: []
})