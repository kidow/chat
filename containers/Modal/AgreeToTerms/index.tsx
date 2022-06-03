import type { FC } from 'react'
import { Modal } from 'containers'
import { Button, Checkbox } from 'components'
import { supabase, useObjectState } from 'services'
import { toast } from 'react-toastify'

export interface Props extends ModalProps {}
interface State {
  isAgreed: boolean
  isLoading: boolean
}

const AgreeToTermsModal: FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  const [{ isAgreed, isLoading }, setState] = useObjectState<State>({
    isAgreed: false,
    isLoading: false
  })

  const onSubmit = async () => {
    const user = supabase.auth.user()
    if (!user) {
      toast.error('죄송합니다. 로그인을 다시 해주시기 바랍니다.')
      return
    }
    setState({ isLoading: true })
    const { error } = await supabase
      .from<Table.User>('users')
      .update({ is_agree_to_terms: true })
      .eq('id', user.id)
    if (error) {
      console.log('containers/Modal/AgreeToTerms')
      console.error(error)
    } else {
      toast.success('환영합니다! 앞으로 좋은 얘기들을 나눠 보아요 :)')
      onClose()
    }
    setState({ isLoading: false })
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="가입을 환영합니다! 👋"
      description="몇 가지 수칙들을 확인하고 넘어가요."
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between">
          <Checkbox
            label="매너 채팅을 할 것임을 동의합니다."
            checked={isAgreed}
            onChange={(isAgreed) => setState({ isAgreed })}
          />
          <Button
            theme="primary"
            onClick={onSubmit}
            loading={isLoading}
            disabled={!isAgreed}
            shape="outlined"
          >
            확인
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2 rounded-lg bg-blue-50 p-3">
          <div className="text-lg font-medium text-blue-500">첫 번째</div>
          <div className="text-sm text-blue-500">content content</div>
        </div>
      </div>
    </Modal>
  )
}

export default AgreeToTermsModal
