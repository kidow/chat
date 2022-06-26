import { useEffect } from 'react'
import type { FC } from 'react'
import { Menu, Header, Modal } from 'containers'
import { Event, EventListener, useObjectState } from 'services'

export interface Props {}
interface State {
  isMyInfoOpen: boolean
}

const Layout: FC<Props> = ({ children }) => {
  const [{ isMyInfoOpen }, setState] = useObjectState<State>({
    isMyInfoOpen: false
  })

  useEffect(() => {
    if (!isMyInfoOpen)
      EventListener.once(Event.MyInfo, ({ detail }: any) =>
        setState({ isMyInfoOpen: detail })
      )
  }, [isMyInfoOpen])
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="flex gap-5">
          <div className="max-h-screen min-h-screen w-80 border-x border-x-neutral-200 bg-white">
            <Header />
            <Menu />
            <div className="h-[100px] border-t border-neutral-200 bg-white">
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                © {new Date().getFullYear()} Coddee. All right reserved.
              </div>
            </div>
          </div>
          <div className="max-h-screen min-h-screen flex-1 border-x border-neutral-200 bg-white">
            {children}
          </div>
        </div>
      </div>
      <Modal.MyInfo
        isOpen={isMyInfoOpen}
        onClose={() => setState({ isMyInfoOpen: false })}
      />
    </>
  )
}

export default Layout
