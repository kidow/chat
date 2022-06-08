import type { NextPage } from 'next'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import classnames from 'classnames'
import { isLoginOpenState, supabase, useObjectState, useUser } from 'services'
import { useCallback, useEffect, useMemo, Fragment } from 'react'
import type { KeyboardEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { SEO } from 'components'
import dayjs from 'dayjs'

interface State {
  content: string
  chats: Array<Table.Chat & { user: Table.User }>
  isLoading: boolean
}

const RoomNamePage: NextPage = () => {
  const [{ content, chats, isLoading }, setState, onChange] =
    useObjectState<State>({
      content: '',
      chats: [],
      isLoading: false
    })
  const setIsLoginOpen = useSetRecoilState(isLoginOpenState)
  const [user] = useUser()
  const { asPath, query, replace } = useRouter()

  const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return
    if (!e.shiftKey) {
      e.preventDefault()
      onCreate()
    }
  }

  const onCreate = async () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true)
      return
    }
    if (!content) return
    const { error } = await supabase.from<Table.Chat>('chats').insert({
      room_name: query.name as string,
      content,
      user_id: user?.id
    })
    if (error) {
      console.error(error)
      return
    }
    setState({ content: '' })
  }

  const get = useCallback(async () => {
    setState({ isLoading: true })
    const { data, error } = await supabase
      .from<Table.Chat & { user: Table.User }>('chats')
      .select(
        `
        *,
        user:user_id (*)
      `
      )
      .eq('room_name', query.name as string)
    if (error) {
      console.error(error)
      setState({ isLoading: false, chats: [] })
      return
    }
    console.log('data', data)
    setState({ chats: data, isLoading: false })
  }, [asPath])

  const validateRoom = useCallback(async () => {
    if (typeof query.name !== 'string') return
    const { error } = await supabase
      .from<Table.Room>('rooms')
      .select('*')
      .eq('name', query.name)
      .single()
    if (error) {
      console.error(error)
      replace('/')
      return
    }
    get()
  }, [asPath])

  const isLoggedIn: boolean = useMemo(() => !!user?.id, [user])

  useEffect(() => {
    validateRoom()
  }, [asPath])
  return (
    <>
      <SEO title={typeof query.name === 'string' ? query.name : ''} />
      <section className="flex flex-col h-full">
        <div className="flex items-center w-full px-5 py-3 font-bold bg-white border-b border-neutral-100">
          {query.name}
        </div>
        <div className="flex flex-col-reverse flex-1 px-5 py-2 space-y-3 space-y-reverse overflow-y-auto overscroll-contain">
          {chats.map((item, key) => (
            <Fragment key={item.id}>
              {item.user_id === user?.id ? (
                <div className="flex justify-end">
                  <div className="px-3 py-2 rounded-lg bg-blue-50">
                    {item.content}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-sm">
                  <img src={item.user.avatar_url} alt="" className="w-8 h-8" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
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
              {(dayjs(item.created_at).diff(chats[key + 1]?.created_at) > 0 ||
                key === chats.length - 1) && (
                <div className="relative z-10 flex items-center justify-center pb-3 text-xs before:absolute before:h-px before:w-full before:bg-neutral-200">
                  <div className="absolute bottom-1/2 left-1/2 z-10 translate-y-[calc(50%-6px)] -translate-x-[46px] select-none bg-white px-5 text-neutral-400">
                    {dayjs(item.created_at).format('MM월 DD일')}
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="w-full px-5 py-3 bg-white border-t border-neutral-100">
          <div className="flex items-end justify-between gap-3">
            <TextareaAutosize
              className="flex-1 px-2 py-1 border rounded-lg border-neutral-200"
              spellCheck={false}
              value={content}
              name="content"
              onChange={onChange}
              onKeyDown={onEnter}
              readOnly={!isLoggedIn}
              onClick={() => {
                if (!isLoggedIn) setIsLoginOpen(true)
              }}
            />
            <button
              className={classnames(
                'rounded-full p-1.5',
                !!content ? 'bg-blue-500' : 'bg-neutral-400',
                { 'cursor-not-allowed': !content || !isLoggedIn }
              )}
              onClick={onCreate}
            >
              <ArrowSmUpIcon className="w-5 h-5 text-neutral-50" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default RoomNamePage
