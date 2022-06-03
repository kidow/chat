import type { FC } from 'react'
import { Modal } from 'containers'
import { Button } from 'components'
import { isLoginOpenState, supabase } from 'services'
import { useRecoilValue } from 'recoil'

export interface Props extends ModalProps {}
interface State {}

const LoginModal: FC<Props> = ({ onClose }) => {
  const isLoginOpen = useRecoilValue(isLoginOpenState)
  if (!isLoginOpen) return null

  const onLogin = async () => {
    const { error } = await supabase.auth.signIn({ provider: 'github' })
    if (error) {
      console.error(error)
    }
  }
  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={onClose}
      title="로그인하기"
      description="커디를 소개합니다!"
      maxWidth="max-w-xs"
      footer={
        <div className="flex justify-center">
          <Button onClick={onLogin} shape="outlined" size="sm">
            깃허브로 로그인
          </Button>
        </div>
      }
    >
      asdasd
    </Modal>
  )
}

export default LoginModal
