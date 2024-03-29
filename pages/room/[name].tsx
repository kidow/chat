import type { NextPage } from 'next'
import { ArrowSmUpIcon, CodeIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import classnames from 'classnames'
import {
  Event,
  EventListener,
  roomListState,
  supabase,
  useObjectState,
  useUser
} from 'services'
import { useEffect, useMemo, Fragment } from 'react'
import type { KeyboardEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { IconButton, SEO, Spinner } from 'components'
import dayjs from 'dayjs'
import { Modal } from 'containers'

interface State {
  content: string
  roomId: number
  isSubmitting: boolean
  isCodeEditorOpen: boolean
}

const RoomNamePage: NextPage = () => {
  const [
    { content, roomId, isSubmitting, isCodeEditorOpen },
    setState,
    onChange
  ] = useObjectState<State>({
    content: '',
    roomId: 0,
    isSubmitting: false,
    isCodeEditorOpen: false
  })
  const [{ isLoggedIn, id }] = useUser()
  const roomList = useRecoilValue(roomListState)
  const { asPath, query, replace } = useRouter()

  const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return
    if (!e.shiftKey) {
      e.preventDefault()
      createChat()
    }
  }

  const createChat = async () => {
    if (isSubmitting) return
    if (!isLoggedIn) {
      EventListener.emit<boolean>(Event.Login, true)
      return
    }
    if (!content || !roomId) return
    setState({ isSubmitting: true })
    try {
      await supabase.from<Table.Chat>('chats').insert({
        room_name: query.name as string,
        content,
        user_id: id,
        room_id: roomId
      })
      setState({ content: '', isSubmitting: false })
    } catch (err) {
      console.error(err)
      setState({ isSubmitting: false })
    }
  }

  const validateRoom = async () => {
    if (typeof query.name !== 'string') return
    try {
      await supabase
        .from<Table.Room>('rooms')
        .select('*')
        .eq('name', query.name)
        .single()
    } catch (err) {
      replace('/')
      console.error(err)
    }
  }

  const getRoomId = async () => {
    if (typeof query.name !== 'string') return
    try {
      const { data } = await supabase
        .from<Table.Room>('rooms')
        .select('id')
        .eq('name', query.name)
        .single()
      setState({ roomId: data?.id })
    } catch (err) {
      console.error(err)
    }
  }

  const chatList: Array<Table.Chat & { user: Table.User }> = useMemo(() => {
    if (typeof query.name !== 'string' || !query.name) return []
    const room = roomList.find((room) => room.name === query.name)
    if (!room) return []
    return room.chats
  }, [query.name, roomList])

  useEffect(() => {
    validateRoom()
    getRoomId()
  }, [asPath])
  return (
    <>
      <SEO title={typeof query.name === 'string' ? query.name : ''} />
      <section className="flex h-full flex-col">
        <div className="flex w-full items-center border-b border-neutral-100 bg-white px-5 py-3 font-bold">
          {query.name}
        </div>
        <div className="flex flex-1 flex-col-reverse space-y-3 space-y-reverse overflow-y-auto overscroll-contain px-5 py-2">
          {!roomList.length ? (
            <div className="flex h-full items-center justify-center">
              <Spinner className="h-5 w-5 text-neutral-800" />
            </div>
          ) : !!chatList.length ? (
            chatList.map((item, key, arr) => (
              <Fragment key={item.id}>
                {item.user_id === id ? (
                  <div className="flex justify-end">
                    <div className="rounded-lg bg-blue-50 px-3 py-2">
                      {item.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-sm">
                    <img
                      src={item.user.avatar_url}
                      alt=""
                      className="h-8 w-8 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="cursor-pointer font-medium">
                          {item.user.nickname ||
                            item.user.email.slice(
                              0,
                              item.user.email.indexOf('@')
                            )}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {dayjs(item.created_at).format('HH:mm')}
                        </span>
                      </div>
                      <div>{item.content}</div>
                    </div>
                  </div>
                )}
                {(!!dayjs(item.created_at).diff(
                  arr[key + 1]?.created_at,
                  'day'
                ) ||
                  key === chatList.length - 1) && (
                  <div className="relative z-10 flex items-center justify-center pb-3 text-xs before:absolute before:h-px before:w-full before:bg-neutral-200">
                    <div className="absolute bottom-1/2 left-1/2 z-10 translate-y-[calc(50%-6px)] -translate-x-[46px] select-none bg-white px-5 text-neutral-400">
                      {dayjs(item.created_at).format('MM월 DD일')}
                    </div>
                  </div>
                )}
              </Fragment>
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-400">
              아직 채팅이 없습니다. 첫 채팅의 주인공이 되어 보시겠어요? :)
            </div>
          )}
        </div>
        <div className="w-full border-t border-neutral-100 bg-white px-5 py-3">
          <div className="flex items-end justify-between gap-3">
            <TextareaAutosize
              className="flex-1 rounded-lg border border-neutral-200 px-2 py-1"
              spellCheck={false}
              value={content}
              name="content"
              onChange={onChange}
              onKeyDown={onEnter}
              readOnly={!isLoggedIn}
              onClick={() => {
                if (!isLoggedIn) EventListener.emit(Event.Login, true)
              }}
            />
            <IconButton onClick={() => setState({ isCodeEditorOpen: true })}>
              <CodeIcon />
            </IconButton>
            <button
              className={classnames(
                'rounded-full p-1.5',
                !!content ? 'bg-blue-500' : 'bg-neutral-400',
                { 'cursor-not-allowed': !content || !isLoggedIn }
              )}
              onClick={createChat}
            >
              <ArrowSmUpIcon className="h-5 w-5 text-neutral-50" />
            </button>
          </div>
        </div>
      </section>

      <Modal.CodeEditor
        isOpen={isCodeEditorOpen}
        onClose={() => setState({ isCodeEditorOpen: false })}
        content={content}
      />
    </>
  )
}

export default RoomNamePage
