import Link from 'next/link'
import type { FC } from 'react'
import { Event, EventListener, useUser } from 'services'

export interface Props {}
interface State {}

const Header: FC<Props> = () => {
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
            onClick={() => EventListener.emit<boolean>(Event.MyInfo, true)}
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
    </>
  )
}

export default Header
