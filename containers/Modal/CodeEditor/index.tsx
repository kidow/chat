import { useMemo } from 'react'
import type { FC } from 'react'
import { Modal } from 'containers'
import Editor from '@monaco-editor/react'
import TextareaAutosize from 'react-textarea-autosize'
import { isMobile } from 'react-device-detect'
import { Button, Select } from 'components'
import { enumToOptions, LANGUAGE, useObjectState, useUser } from 'services'

export interface Props extends ModalProps {
  content?: string
  language?: string
  codeBlock?: string
}
interface State {
  content: string
  language: string
  codeBlock: string
  isSubmitting: boolean
}

const CodeEditorModal: FC<Props> = ({ isOpen, onClose, ...props }) => {
  if (!isOpen) return null
  const [{ content, language, codeBlock, isSubmitting }, setState, onChange] =
    useObjectState<State>({
      content: props.content || '',
      language: props.language || 'javascript',
      codeBlock: props.codeBlock || '',
      isSubmitting: false
    })

  const [user] = useUser()

  const create = async () => {}

  const isLoggedIn: boolean = useMemo(() => !!user?.id, [user])
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="코드블록 첨부"
      description={
        !isLoggedIn && (
          <span className="text-red-500">
            글 작성은 로그인한 경우에만 가능합니다.
          </span>
        )
      }
      maxWidth="max-w-4xl"
      footer={
        <div className="flex items-center justify-between">
          <Select
            value={language}
            name="language"
            onChange={(e) =>
              setState({ language: e.target.value, codeBlock: '' })
            }
          >
            {enumToOptions(LANGUAGE).map((item, key) => (
              <option value={item.value} key={key}>
                {item.name}
              </option>
            ))}
          </Select>
          <Button
            loading={isSubmitting}
            theme="primary"
            shape="outlined"
            disabled={!content || !isLoggedIn}
          >
            작성
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {isMobile ? (
          <div>코드 에디터는 PC 환경에서만 확인 가능합니다.</div>
        ) : (
          <Editor
            height="500px"
            defaultLanguage={props.language}
            language={language}
            defaultValue={props.codeBlock}
            value={codeBlock}
            theme="vs-dark"
          />
        )}
        <TextareaAutosize
          className="w-full rounded-lg border border-neutral-200 px-2 py-1"
          spellCheck={false}
          value={content}
          name="content"
          onChange={onChange}
          readOnly={!isLoggedIn}
        />
      </div>
    </Modal>
  )
}

export default CodeEditorModal
