import Link from 'next/link'
import { useMemo } from 'react'
import type { FC } from 'react'
import { isLoginOpenState, useObjectState, useUser } from 'services'
import { useRecoilState } from 'recoil'
import { Modal } from 'containers'

export interface Props {}
interface State {
  isMyInfoOpen: boolean
}

const Header: FC<Props> = () => {
  const [{ isMyInfoOpen }, setState] = useObjectState<State>({
    isMyInfoOpen: false
  })
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(isLoginOpenState)
  const [user] = useUser()

  const isLoggedIn: boolean = useMemo(() => !!user?.id, [user])
  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-100 py-3 px-5">
        <Link href="/">
          <a>Coddee</a>
        </Link>
        {isLoggedIn ? (
          <img
            src={user?.avatar_url}
            alt=""
            className="h-7 w-7 cursor-pointer rounded-full"
            onClick={() => setState({ isMyInfoOpen: true })}
          />
        ) : (
          <button className="text-sm" onClick={() => setIsLoginOpen(true)}>
            로그인
          </button>
        )}
      </div>
      <Modal.Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Modal.MyInfo
        isOpen={isMyInfoOpen}
        onClose={() => setState({ isMyInfoOpen: false })}
      />
    </>
  )
}

export default Header
