import { useCallback, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Toast } from 'containers'
import { EventListener, randomString, useObjectState } from 'services'

export interface Props {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  autoClose?: number | false
}
interface State {
  list: NToast.State[]
}

const ToastContainer: FC<Props> = ({
  position = 'top-right',
  autoClose = 3000
}) => {
  const [{ list }, setState] = useObjectState<State>({ list: [] })

  const onMessage = useCallback(
    ({ detail }: any) =>
      setState({
        list: !!detail.id
          ? list.filter((item) => item.id !== detail.id)
          : [
              ...list,
              {
                id: randomString(),
                message: detail.message,
                type: detail.type,
                position: detail.position || position,
                pauseOnHover: detail.pauseOnHover || true
              }
            ]
      }),
    [list.length]
  )

  const render = (position: NToast.Position): ReactNode => {
    const positionList = list.filter((item) => item.position === position)
    if (!positionList.length) return null
    return (
      <Toast.Wrapper position={position}>
        {positionList.map((item, key) => (
          <Toast key={key} autoClose={autoClose} {...item} />
        ))}
      </Toast.Wrapper>
    )
  }

  // list.length가 늘어날 때만 실행하도록 바꿔야 함!
  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list.length])

  if (!list.length) return null
  return (
    <>
      {render('top-left')}
      {render('top-center')}
      {render('top-right')}
      {render('bottom-left')}
      {render('bottom-center')}
      {render('bottom-right')}
    </>
  )
}

export default ToastContainer
