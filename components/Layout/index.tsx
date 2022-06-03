import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { isLoginOpenState, supabase, useObjectState, useUser } from 'services'
import { Modal } from 'containers'
import { useRecoilState } from 'recoil'

export interface Props {}
interface State {
  rooms: Table.Room[]
  isMyInfoOpen: boolean
}

const Layout: FC<Props> = ({ children }) => {
  const [{ rooms, isMyInfoOpen }, setState] = useObjectState<State>({
    rooms: [],
    isMyInfoOpen: false
  })
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(isLoginOpenState)
  const { query } = useRouter()
  const [user] = useUser()

  const getRooms = async () => {
    const { data, error } = await supabase.from<Table.Room>('rooms').select('*')
    if (error) {
      console.error(error)
      return
    }
    setState({ rooms: data })
  }

  const isLoggedIn: boolean = useMemo(() => !!user?.id, [user])

  useEffect(() => {
    getRooms()
  }, [])
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="flex gap-5">
          <div className="max-h-screen min-h-screen w-80 border-x border-x-neutral-200 bg-white">
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
                <button
                  className="text-sm"
                  onClick={() => setIsLoginOpen(true)}
                >
                  로그인
                </button>
              )}
            </div>
            <div className="max-h-[calc(100vh-48px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
              {rooms.map((item) => (
                <Link key={item.id} href={`/room/${item.name}`}>
                  <a>
                    <div
                      className={classnames(
                        'group flex items-center justify-between py-3 px-5',
                        item.name === query.name
                          ? 'bg-blue-100'
                          : 'hover:bg-blue-50'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex flex-col justify-center rounded-full border border-neutral-100">
                          <Image
                            src="https:/i.pravatar.cc"
                            alt=""
                            height={24}
                            width={24}
                            className="rounded-full"
                          />
                        </span>
                        <span
                          className={classnames(
                            item.name === query.name
                              ? 'text-blue-500'
                              : 'text-neutral-700 group-hover:text-neutral-900'
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                        1
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="max-h-screen min-h-screen flex-1 border-x border-neutral-200 bg-white">
            {children}
          </div>
        </div>
      </div>

      <Modal.Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Modal.MyInfo
        isOpen={isMyInfoOpen}
        onClose={() => setState({ isMyInfoOpen: false })}
      />
    </>
  )
}

export default Layout
