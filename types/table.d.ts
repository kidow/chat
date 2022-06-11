namespace Table {
  interface Chat {
    id: number
    content: string
    created_at: string
    room_name: string
    user_id: string
    room_id: number
  }

  interface Room {
    id: number
    name: string
    created_at: string
    thumbnail_url: string
  }

  interface User {
    id: string
    created_at: string
    updated_at: string
    email: string
    avatar_url: string
    nickname: string
    is_agree_to_terms: boolean
    interested_room: string[]
  }
}