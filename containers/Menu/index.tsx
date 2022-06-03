import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { supabase, useObjectState } from 'services'

export interface Props {}
interface State {
  rooms: Table.Room[]
}

const Menu: FC<Props> = () => {
  const [{ rooms }, setState] = useObjectState<State>({
    rooms: []
  })
  const { query } = useRouter()

  const getRooms = async () => {
    const { data, error } = await supabase.from<Table.Room>('rooms').select('*')
    if (error) {
      console.error(error)
      return
    }
    setState({ rooms: data })
  }

  useEffect(() => {
    getRooms()
  }, [])
  return (
    <div className="max-h-[calc(100vh-48px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
      {rooms.map((item) => (
        <Link key={item.id} href={`/room/${item.name}`}>
          <a>
            <div
              className={classnames(
                'group flex items-center justify-between py-3 px-5',
                item.name === query.name ? 'bg-blue-100' : 'hover:bg-blue-50'
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
  )
}

export default Menu
