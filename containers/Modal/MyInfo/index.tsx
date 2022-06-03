import type { FC } from 'react'
import { Modal } from 'containers'
import classnames from 'classnames'
import { useObjectState } from 'services'

export interface Props extends ModalProps {}
interface State {
  tab: string
}

const MyInfoModal: FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  const [{ tab }, setState] = useObjectState<State>({ tab: '' })
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title="내 정보"
      padding={false}
    >
      <div className="flex divide-x divide-neutral-200">
        <div className="w-56 p-4 text-sm">
          <ul className="space-y-1">
            <div className="text-xs font-bold text-neutral-500">
              사용자 설정
            </div>
            <li className="cursor-pointer text-neutral-400">내 정보</li>
          </ul>
          <hr className="my-4" />
          <ul>
            <li>로그아웃</li>
          </ul>
        </div>
        <div className="flex-1 p-4">ㄴㄴㄴ</div>
      </div>
    </Modal>
  )
}

export default MyInfoModal
