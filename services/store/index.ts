import { atom, selector } from 'recoil'

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    id: '',
    email: '',
    avatar_url: '',
    nickname: '',
    created_at: '',
    last_sign_in_at: '',
    provider: ''
  }
})

export const isLoggedInState = selector<boolean>({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const user = get(userState)
    return !!user?.id
  }
})

export const isLoginOpenState = atom<boolean>({
  key: 'isLoginOpenState',
  default: false
})

export const roomListState = atom<
  Array<Table.Room & { chats: Array<Table.Chat & { user: Table.User }> }>
>({
  key: 'roomListState',
  default: []
})
