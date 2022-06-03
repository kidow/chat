import { useEffect } from 'react'
import type { FC } from 'react'
import { Spinner } from 'components'
import { useRecoilValue } from 'recoil'
import { backdropState } from 'services'

interface Props {}

const Backdrop: FC<Props> = () => {
  const isBackdrop = useRecoilValue(backdropState)
  useEffect(() => {
    if (isBackdrop) document.body.style.overflow = 'hidden'
    else document.body.removeAttribute('style')
  }, [isBackdrop])
  if (!isBackdrop) return null
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30" />
      <span className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner className="h-10 w-10" />
      </span>
    </>
  )
}

export default Backdrop
