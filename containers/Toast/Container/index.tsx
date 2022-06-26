import { useCallback, useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { Toast } from 'containers'
import { EventListener, useObjectState } from 'services'

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
        list: [
          ...list,
          {
            message: detail.message,
            type: detail.type,
            position: detail.position || position
          }
        ]
      }),
    [list.length]
  )

  const topLeftList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-left'),
    [list]
  )
  const topCenterList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-center'),
    [list]
  )
  const topRightList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'top-right'),
    [list]
  )
  const bottomLeftList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-left'),
    [list]
  )
  const bottomCenterList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-center'),
    [list]
  )
  const bottomRightList: NToast.State[] = useMemo(
    () => list.filter((item) => item.position === 'bottom-right'),
    [list]
  )

  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list.length])

  if (!list.length) return null
  return (
    <>
      {!!topLeftList.length && (
        <Toast.Wrapper position="top-left">
          {topLeftList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
      {!!topCenterList.length && (
        <Toast.Wrapper position="top-center">
          {topCenterList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
      {!!topRightList.length && (
        <Toast.Wrapper position="top-right">
          {topRightList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomLeftList.length && (
        <Toast.Wrapper position="bottom-left">
          {bottomLeftList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomCenterList.length && (
        <Toast.Wrapper position="bottom-center">
          {bottomCenterList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
      {!!bottomRightList.length && (
        <Toast.Wrapper position="bottom-right">
          {bottomRightList.map((item, key) => (
            <Toast
              key={key}
              message={item.message}
              position={item.position}
              type={item.type}
              onRemove={() =>
                setState({ list: list.filter((_, i) => i !== key) })
              }
            />
          ))}
        </Toast.Wrapper>
      )}
    </>
  )
}

export default ToastContainer
