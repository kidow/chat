import { atom } from 'recoil'
import type { User } from '@supabase/supabase-js'

export const authState = atom<User | null>({
  key: 'authState',
  default: null
})