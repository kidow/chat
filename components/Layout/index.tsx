import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { useObjectState } from 'services'
import { Modal } from 'containers'

export interface Props {}
interface State {
  isLoginOpen: boolean
}

const Layout: FC<Props> = ({ children }) => {
  const [{ isLoginOpen }, setState] = useObjectState<State>({
    isLoginOpen: false
  })
  const { asPath } = useRouter()
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="flex gap-5">
          <div className="max-h-screen min-h-screen w-80 border-x border-x-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-100 py-3 px-5">
              <Link href="/">
                <a>Coddee</a>
              </Link>
              <button
                className="text-sm"
                onClick={() => setState({ isLoginOpen: true })}
              >
                로그인
              </button>
            </div>
            <div className="max-h-[calc(100vh-48px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
              {Array.from({ length: 10 }).map((_, key) => (
                <Link key={key} href={`/room/1`}>
                  <a>
                    <div
                      className={classnames(
                        'flex items-center justify-between py-3 px-5'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex flex-col justify-center rounded-full border border-neutral-100">
                          <Image
                            src="https:/i.pravatar.cc"
                            alt=""
                            height={24}
                            width={24}
                            className="rounded-full"
                          />
                        </span>
                        <span>Python</span>
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

      <Modal.Login
        isOpen={isLoginOpen}
        onClose={() => setState({ isLoginOpen: false })}
      />
    </>
  )
}

export default Layout
