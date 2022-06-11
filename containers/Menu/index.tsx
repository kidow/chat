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
    const { data, error } = await supabase.from<Table.Room>('rooms').select(`
      *,
      chats (*)
    `)
    if (error) {
      console.error(error)
      return
    }
    console.log('data', data)
    setState({ rooms: data })
  }

  useEffect(() => {
    getRooms()
  }, [])
  return (
    <div className="h-[calc(100vh-148px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
      {rooms.map((item) => (
        <Link key={item.id} href={`/room/${item.name}`}>
          <a>
            <div
              className={classnames(
                'group flex items-center justify-between py-3 px-5',
                item.name === query.name ? 'bg-blue-100' : 'hover:bg-blue-50'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex flex-col justify-center border rounded-full border-neutral-100">
                  <img
                    src={item.thumbnail_url}
                    alt=""
                    className="w-6 h-6 rounded"
                  />
                </span>
                <span
                  className={classnames(
                    'truncate font-semibold',
                    item.name === query.name
                      ? 'text-blue-500'
                      : 'text-neutral-700 group-hover:text-neutral-900'
                  )}
                >
                  {item.name}
                </span>
              </div>
              <span className="flex items-center justify-center w-2 h-2 text-sm text-white bg-red-300 rounded-full group-hover:bg-red-500" />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Menu
