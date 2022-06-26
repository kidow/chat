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
    try {
      const { data } = await supabase
        .from<Table.User>('users')
        .select('*')
        .eq('id', user.id)
      if (!data?.length) createUser()
      else if (!data[0].is_agree_to_terms)
        setState({ isAgreeToTermsOpen: true })
    } catch (err) {
      console.error(err)
    }
  }

  const createUser = async () => {
    const user = supabase.auth.user()
    if (!user) return
    try {
      await supabase.from<Table.User>('users').insert({
        id: user.id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url || '',
        nickname:
          user.user_metadata.full_name ||
          user.email?.slice(0, user.email?.indexOf('@')) ||
          '',
        is_agree_to_terms: false
      })
      setState({ isAgreeToTermsOpen: true })
    } catch (err) {
      console.error(err)
    }
  }

  const updateUser = async () => {
    const user = supabase.auth.user()
    if (!user) {
      setUser(null)
      return
    }
    try {
      await supabase
        .from<Table.User>('users')
        .update({
          id: user.id,
          email: user.email,
          avatar_url: user.user_metadata.avatar_url || '',
          nickname:
            user.user_metadata.full_name ||
            user.email?.slice(0, user.email?.indexOf('@')) ||
            '',
          created_at: user.created_at,
          updated_at: user.updated_at
        })
        .eq('id', user.id)
      setUser({
        id: user.id,
        email: user.email || '',
        avatar_url: user.user_metadata.avatar_url || '',
        nickname:
          user.user_metadata.full_name ||
          user.email?.slice(0, user.email?.indexOf('@')) ||
          '',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at || '',
        provider: user.app_metadata.provider || ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser({
          id: session?.user?.id || '',
          email: session?.user?.email || '',
          avatar_url: session?.user?.user_metadata.avatar_url || '',
          nickname:
            session?.user?.user_metadata.full_name ||
            session?.user?.email?.slice(
              0,
              session?.user?.email?.indexOf('@')
            ) ||
            '',
          created_at: session?.user?.created_at || '',
          last_sign_in_at: session?.user?.last_sign_in_at || '',
          provider: session?.user?.app_metadata.provider || ''
        })
        inquireUser()
      }
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') setUser(null)
      if (event === 'USER_UPDATED') updateUser()
    })
    const user = supabase.auth.user()
    if (!user) return
    setUser({
      id: user.id,
      email: user.email || '',
      avatar_url: user.user_metadata.avatar_url || '',
      nickname:
        user.user_metadata.full_name ||
        user.email?.slice(0, user.email?.indexOf('@')) ||
        '',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || '',
      provider: user.app_metadata.provider || ''
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
