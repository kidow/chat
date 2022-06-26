import { useCallback, useEffect, useMemo } from 'react'
import type { FC } from 'react'
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
}
interface State {
  list: NToast.State[]
}

const ToastContainer: FC<Props> = ({ position = 'top-right' }) => {
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

  const topLeftList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-left'),
    [list.length]
  )
  const topCenterList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-center'),
    [list.length]
  )
  const topRightList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-right'),
    [list.length]
  )
  const bottomLeftList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-left'),
    [list.length]
  )
  const bottomCenterList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-center'),
    [list.length]
  )
  const bottomRightList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-right'),
    [list.length]
  )

  // list.length가 늘어날 때만 실행하도록 바꿔야 함!
  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list.length])

  if (!list.length) return null
  return (
    <>
      {!!topLeftList.length && (
        <Toast.Wrapper position="top-left">
          {topLeftList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
      {!!topCenterList.length && (
        <Toast.Wrapper position="top-center">
          {topCenterList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
      {!!topRightList.length && (
        <Toast.Wrapper position="top-right">
          {topRightList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomLeftList.length && (
        <Toast.Wrapper position="bottom-left">
          {bottomLeftList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomCenterList.length && (
        <Toast.Wrapper position="bottom-center">
          {bottomCenterList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomRightList.length && (
        <Toast.Wrapper position="bottom-right">
          {bottomRightList.map((item, key) => (
            <Toast key={key} {...item} />
          ))}
        </Toast.Wrapper>
      )}
    </>
  )
}

export default ToastContainer
