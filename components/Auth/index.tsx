import { useEffect } from 'react'
import type { FC } from 'react'
import { supabase, useUser } from 'services'

export interface Props {}

const Auth: FC<Props> = ({ children }) => {
  const [user, setUser] = useUser()

  const inquireUser = async (id: string) => {
    if (!id) return
    const result = await supabase
      .from<Table.User>('users')
      .select('*')
      .eq('id', id)
      .single()
    console.log('result', result)
  }

  const createUser = async (id: string) => {}

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
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
        inquireUser(session?.user?.id || '')
      }
    })
    const currentUser = supabase.auth.user()
    if (!user && !!currentUser)
      setUser({
        id: currentUser.id,
        email: currentUser.email || '',
        avatar_url: currentUser.user_metadata.avatar_url,
        nickname: currentUser.user_metadata.full_name,
        created_at: currentUser.created_at,
        last_sign_in_at: currentUser.last_sign_in_at || '',
        provider: currentUser.app_metadata.provider || ''
      })
  }, [])
  return <>{children}</>
}

export default Auth
