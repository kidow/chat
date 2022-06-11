import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { roomListState, supabase, useObjectState } from 'services'
import { useRecoilState } from 'recoil'

export interface Props {}
interface State {
  chat: Table.Chat | null
}

const Menu: FC<Props> = () => {
  const [{ chat }, setState] = useObjectState<State>({ chat: null })
  const { query } = useRouter()
  const [roomList, setRoomList] = useRecoilState(roomListState)

  const getRooms = useCallback(async () => {
    const { data, error } = await supabase
      .from<Table.Room & { chats: Array<Table.Chat & { user: Table.User }> }>(
        'rooms'
      )
      .select(
        `
      *,
      chats (
        *,
        user:user_id (*)
      )
    `
      )
      .order('name')
    if (error) {
      console.log('getRooms error')
      console.error(error)
      return
    }
    setRoomList(
      data.map((item) => ({
        ...item,
        chats: item.chats.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      }))
    )
  }, [])

  const getChat = async () => {
    if (!chat) return
    const index = roomList.findIndex((room) => room.id === chat.room_id)
    const { data: user, error } = await supabase
      .from<Table.User>('users')
      .select('*')
      .eq('id', chat.user_id)
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

        chats: [
          { ...chat, isNotChecked: true, user },
          ...roomList[index].chats
        ],
        ...(query.name !== roomList[index].name
          ? { lastChat: chat.content }
          : {})
      },
      ...roomList.slice(index + 1)
    ])
    setState({ chat: null })
  }

  useEffect(() => {
    getRooms()
  }, [])

  useEffect(() => {
    const listner = supabase
      .from<Table.Chat>('chats')
      .on('INSERT', async (payload) => setState({ chat: payload.new }))
      .subscribe()
    return () => {
      listner.unsubscribe()
    }
  }, [])

  useEffect(() => {
    getChat()
  }, [chat])
  return (
    <div className="h-[calc(100vh-148px)] divide-y divide-neutral-100 overflow-auto overscroll-contain">
      {roomList.map((item, key) => (
        <Link key={key} href={`/room/${item.name}`}>
          <a
            onClick={() => {
              if (!!item.lastChat)
                setRoomList([
                  ...roomList.slice(0, key),
                  { ...item, lastChat: '' },
                  ...roomList.slice(key + 1)
                ])
            }}
          >
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
                    'truncate',
                    item.name === query.name
                      ? 'text-blue-500'
                      : 'text-neutral-700 group-hover:text-neutral-900',
                    { 'font-semibold': !item.lastChat }
                  )}
                >
                  {item.lastChat || item.name}
                </span>
              </div>
              {!!item.lastChat && (
                <span
                  className={classnames(
                    'flex h-2 w-2 items-center justify-center rounded-full text-sm text-white',
                    item.name === query.name
                      ? 'bg-red-500'
                      : 'bg-red-300 group-hover:bg-red-500'
                  )}
                />
              )}
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Menu
