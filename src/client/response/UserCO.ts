import type { UserRole } from '@prisma/client'

interface InternalUserCO {
  id: number
  name: string
  password: string
  role: UserRole
}

export type UserCO = Readonly<InternalUserCO>
