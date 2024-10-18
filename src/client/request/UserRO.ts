import type { UserRole } from '@prisma/client'

interface InternalUserRO {
  id: number
  name: string
  password: string
  role: UserRole
}

export type CreateUserRO = Readonly<Omit<InternalUserRO, 'id'>>
export type UpdateUserRO = Readonly<InternalUserRO>
