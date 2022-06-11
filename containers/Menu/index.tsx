import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { roomListState, supabase } from 'services'
import { useRecoilState } from 'recoil'

export interface Props {}
interface State {}

const Menu: FC<Props> = () => {
  const { query } = useRouter()
  const [roomList, setRoomList] = useRecoilState(roomListState)

  const getRooms = useCallback(async () => {
    const { data, error } = await supabase.from<
      Table.Room & { chats: Array<Table.Chat & { user: Table.User }> }
    >('rooms').select(`
      *,
      chats (
        *,
        user:user_id (*)
      )
    `)
    if (error) {
      console.error(error)
      return ``
    }
    console.log('이거됨?', data)
    setRoomList(data)

    supabase
      .from<Table.Chat>('chats')
      .on('INSERT', async (payload) => {
        const index = roomList.findIndex(
          (room) => room.id === payload.new.room_id
        )
        if (index === -1) return
        const { data: user, error } = await supabase
          .from<Table.User>('users')
          .select('*')
          .eq('id', payload.new.user_id)
          .single()
        if (error) {
          console.log('subscription error')
          console.error(error)
          return
        }
        setRoomList([
          ...roomList.slice(0, index),
          {
            ...roomList[index],
            lastChat: payload.new.content,
            isLastChatNotChecked: true,
            chats: [{ ...payload.new, user }, ...roomList[index].chats]
          },
          ...roomList.slice(index + 1)
        ])
      })
      .subscribe()
  }, [])

  useEffect(() => {
    getRooms()
  }, [])
  return (
    <div className="h-[calc(100vh-148px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
      {roomList.map((item) => (
        <Link key={item.id} href={`/room/${item.name}`}>
          <a>
            <div
              className={classnames(
                'group flex items-center justify-between py-3 px-5',
                item.name === query.name ? 'bg-blue-100' : 'hover:bg-blue-50'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex flex-col justify-center rounded-full border border-neutral-100">
                  <img
                    src={item.thumbnail_url}
                    alt=""
                    className="h-6 w-6 rounded"
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
              <span
                className={classnames(
                  'flex h-2 w-2 items-center justify-center rounded-full text-sm text-white',
                  item.name === query.name
                    ? 'bg-red-500'
                    : 'bg-red-300 group-hover:bg-red-500'
                )}
              />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Menu
