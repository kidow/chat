import type { NextPage } from 'next'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import TextareaAutosize from 'react-textarea-autosize'
import classnames from 'classnames'
import { isLoginOpenState, supabase, useObjectState, useUser } from 'services'
import { useCallback, useEffect, useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { SEO } from 'components'

interface State {
  content: string
  chats: Table.Chat[]
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
      .from<Table.Chat>('chats')
      .select(`*`)
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
      <section className="relative h-full">
        <div className="absolute top-0 left-0 flex items-center w-full px-5 py-3 font-bold bg-white border-b border-neutral-100">
          {query.name}
        </div>
        <div className="flex h-[calc(100vh-59px)] flex-col space-y-3 overflow-y-auto overscroll-contain px-5 pt-[49px] pb-2">
          {chats.map((item) => (
            <div
              key={item.id}
              className={classnames('flex items-center gap-4 text-sm')}
            >
              <img src="https://i.pravatar.cc" alt="" className="w-8 h-8" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">wcgo2ling</span>
                  <span className="text-xs text-neutral-400">16:54 오후</span>
                </div>
                <div>content</div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <div className="px-3 py-2 rounded-lg bg-blue-50">w-full</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-5 py-3 bg-white border-t border-neutral-100">
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
