import type { UserRole } from '@prisma/client'

export class User {
  constructor(
    public id: number,
    public name: string,
    public password: string,
    public role: UserRole,
  ) {}
}
