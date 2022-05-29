import type { FC } from 'react'

export interface Props {}
interface State {}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex gap-5">
        <div className="max-h-screen min-h-screen w-80 border-x border-x-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 py-3 px-5">
            <span>CODDEE</span>
            <span>Login</span>
          </div>
          <div className="max-h-[calc(100vh-48px)] divide-y divide-neutral-100 overflow-auto">
            <div className="py-3 px-5">asd</div>
          </div>
        </div>
        <div className="max-h-screen min-h-screen flex-1 border-x border-neutral-200 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
