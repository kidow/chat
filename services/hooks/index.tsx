import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, isLoggedInState, EventListener, Event } from 'services'
import type { SetterOrUpdater, Resetter } from 'recoil'

export function useObjectState<T>(
  initialObject: T
): [
  T,
  (obj: Partial<T>, callback?: (state: T) => void) => void,
  (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void,
  (keys?: Array<keyof T>) => void
] {
  const [state, setState] = useState<T>(initialObject)
  const callbackRef = useRef<(state: T) => void>()
  const isFirstCallbackCall = useRef<boolean>(true)

  const onChange = useCallback(
    (obj: Partial<T>, callback?: (state: T) => void) => {
      callbackRef.current = callback
      setState((prevState) => ({ ...prevState, ...obj }))
    },
    [state]
  )

  const onEventChange = useCallback(
    ({
      target: { name, value }
    }: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): void => setState((prevState) => ({ ...prevState, [name]: value })),
    [state]
  )

  const arrayToObject = (keys: Array<keyof T>): T => {
    if (!keys.length) return initialObject
    const initial: any = {}
    keys.reduce((acc, cur) => (initial[cur] = initialObject[cur]), initial)
    return initial
  }
  const resetState = (keys?: Array<keyof T>) =>
    keys
      ? setState((prevState) => ({ ...prevState, ...arrayToObject(keys) }))
      : setState(initialObject)

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false
      return
    }
    callbackRef.current?.(state)
  }, [state])

  return [state, onChange, onEventChange, resetState]
}

export const useUser = (): [
  IUser & { isLoggedIn: boolean },
  SetterOrUpdater<IUser>,
  Resetter
] => {
  const user = useRecoilValue(userState)
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const setUser = useSetRecoilState(userState)
  const resetUser = () =>
    setUser({
      id: '',
      email: '',
      avatar_url: '',
      nickname: '',
      created_at: '',
      last_sign_in_at: '',
      provider: ''
    })

  return [
    {
      id: user?.id || '',
      email: user?.email || '',
      avatar_url: user?.avatar_url || '',
      nickname: user?.nickname || '',
      created_at: user?.created_at || '',
      last_sign_in_at: user?.last_sign_in_at || '',
      provider: user?.provider || '',
      isLoggedIn
    },
    setUser,
    resetUser
  ]
}

export const useStateDidUpdate = () => {}
