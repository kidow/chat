import type { FC } from 'react'
import { Modal } from 'containers'

export interface Props extends ModalProps {}
interface State {}

const LoginModal: FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="환영합니다!">
      로그인을 해주세요.
    </Modal>
  )
}

export default LoginModal
