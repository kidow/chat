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
    try {
      await supabase.auth.signIn({ provider: 'github' })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={onClose}
      title="로그인하기"
      description="커디에 오신 것을 환영합니다! 👋"
      maxWidth="max-w-lg"
      footer={
        <div className="flex items-center justify-center gap-3">
          <Button onClick={onLogin} size="sm">
            깃허브로 시작하기
          </Button>
        </div>
      }
    >
      <div className="text-sm">
        <div className="text-center text-neutral-400">
          <div>카페에서 커피를 마시며 일상을 나누듯,</div>
          <div>개발자들끼리 모여 일상을 나누어 보아요.</div>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex gap-2 rounded-lg bg-blue-50 p-4">
            <span>👨‍💻</span>
            <span>
              30여개 이상 언어의 코드블록을 채팅방에서 올릴 수 있습니다!
            </span>
          </div>
          <div className="flex gap-2 rounded-lg bg-blue-50 p-4">
            <span>👨‍👨‍👦‍👦</span>
            <span>
              다른 업계의 개발자들은 어떤 얘기들을 하는지 궁금하다면? ↓
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal
