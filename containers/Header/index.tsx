import Link from 'next/link'
import type { FC } from 'react'
import { Event, EventListener, useObjectState, useUser } from 'services'
import { Modal } from 'containers'

export interface Props {}
interface State {
  isMyInfoOpen: boolean
}

const Header: FC<Props> = () => {
  const [{ isMyInfoOpen }, setState] = useObjectState<State>({
    isMyInfoOpen: false
  })
  const [{ isLoggedIn, avatar_url }] = useUser()

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-100 py-3 px-5">
        <Link href="/">
          <a>Coddee</a>
        </Link>
        {isLoggedIn ? (
          <img
            src={avatar_url}
            alt=""
            className="h-7 w-7 cursor-pointer rounded-full"
            onClick={() => setState({ isMyInfoOpen: true })}
          />
        ) : (
          <button
            className="text-sm"
            onClick={() => EventListener.emit<boolean>(Event.Login, true)}
          >
            로그인
          </button>
        )}
      </div>
      <Modal.MyInfo
        isOpen={isMyInfoOpen}
        onClose={() => setState({ isMyInfoOpen: false })}
      />
    </>
  )
}

export default Header
