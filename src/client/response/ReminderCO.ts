import type { UserCO } from './UserCO.js'

interface InternalReminderCO {
  id: number
  title: string
  content: string
  creatorId: number
  creator: UserCO
  dueDate: string
  createdAt: Date
  updatedAt: Date
}

export type ReminderCO = Readonly<Omit<InternalReminderCO, 'creator'>>
