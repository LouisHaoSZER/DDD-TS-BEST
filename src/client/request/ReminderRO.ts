interface InternalReminderRO {
  id: number
  title: string
  content: string
  creatorId: number
  dueDate: string
  createdAt: Date
  updatedAt: Date
}

export type CreateReminderRO = Readonly<Omit<InternalReminderRO, 'createdAt' | 'updatedAt' | 'id'>>
export type UpdateReminderRO = Readonly<Omit<InternalReminderRO, 'createdAt' | 'updatedAt'>>
