import { useEffect } from 'react'
import type { FC } from 'react'
import { supabase, useObjectState, useUser } from 'services'
import { Modal } from 'containers'

export interface Props {}
interface State {
  isAgreeToTermsOpen: boolean
}

const Auth: FC<Props> = ({ children }) => {
  const [{ isAgreeToTermsOpen }, setState] = useObjectState<State>({
    isAgreeToTermsOpen: false
  })
  const [, setUser] = useUser()

  const inquireUser = async () => {
    const user = supabase.auth.user()
    if (!user) return
    const { data, error } = await supabase
      .from<Table.User>('users')
      .select('*')
      .eq('id', user.id)
    if (error) {
      console.log('components/Auth inquireUser')
      console.error(error)
      return
    }
    if (!data.length) createUser()
    else if (!data[0].is_agree_to_terms) setState({ isAgreeToTermsOpen: true })
  }

  const createUser = async () => {
    const user = supabase.auth.user()
    if (!user) return
    const { error } = await supabase.from<Table.User>('users').insert({
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      email: user.email,
      avatar_url: user.user_metadata.avatar_url || '',
      nickname: user.user_metadata.full_name || '',
      is_agree_to_terms: false
    })
    if (error) {
      console.log('component/Auth createUser')
      console.error(error)
      return
    }
    setState({ isAgreeToTermsOpen: true })
  }

  const updateUser = async () => {
    const user = supabase.auth.user()
    if (!user) {
      setUser(null)
      return
    }
    const { error } = await supabase
      .from<Table.User>('users')
      .update({
        id: user.id,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url || '',
        nickname: user.user_metadata.full_name || '',
        created_at: user.created_at,
        updated_at: user.updated_at
      })
      .eq('id', user.id)
    if (error) {
      console.log('component/Auth updateUser')
      console.error(error)
      return
    }
    setUser({
      id: user.id,
      email: user.email || '',
      avatar_url: user.user_metadata.avatar_url || '',
      nickname: user.user_metadata.full_name || '',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || '',
      provider: user.app_metadata.provider || ''
    })
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser({
          id: session?.user?.id || '',
          email: session?.user?.email || '',
          avatar_url: session?.user?.user_metadata.avatar_url || '',
          nickname: session?.user?.user_metadata.full_name || '',
          created_at: session?.user?.created_at || '',
          last_sign_in_at: session?.user?.last_sign_in_at || '',
          provider: session?.user?.app_metadata.provider || ''
        })
        inquireUser()
      }
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') setUser(null)
      if (event === 'USER_UPDATED') updateUser()
    })
  }, [])
  return (
    <>
      {children}
      <Modal.AgreeToTerms
        isOpen={isAgreeToTermsOpen}
        onClose={() => setState({ isAgreeToTermsOpen: false })}
      />
    </>
  )
}

export default Auth
