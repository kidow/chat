import type { FC } from 'react'
import { Menu, Header } from 'containers'

export interface Props {}
interface State {}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="container px-5 mx-auto">
        <div className="flex gap-5">
          <div className="max-h-screen min-h-screen bg-white w-80 border-x border-x-neutral-200">
            <Header />
            <Menu />
            <div className="h-[100px] border-t border-neutral-200 bg-white">
              <div className="flex items-center justify-center h-full text-sm text-neutral-400">
                © {new Date().getFullYear()} Coddee. All right reserved.
              </div>
            </div>
          </div>
          <div className="flex-1 max-h-screen min-h-screen bg-white border-x border-neutral-200">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
