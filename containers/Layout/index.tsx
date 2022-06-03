import type { FC } from 'react'
import { Menu, Header } from 'containers'

export interface Props {}
interface State {}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="flex gap-5">
          <div className="max-h-screen min-h-screen w-80 border-x border-x-neutral-200 bg-white">
            <Header />
            <Menu />
          </div>
          <div className="max-h-screen min-h-screen flex-1 border-x border-neutral-200 bg-white">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
