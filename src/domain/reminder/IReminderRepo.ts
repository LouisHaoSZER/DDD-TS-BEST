// import type { CreateReminderRO, UpdateReminderRO } from '../../client/request/ReminderRO.js'
import type { Reminder } from './Reminder.js'

export interface IReminderRepo {
  getReminder: (id: number) => Promise<Reminder | null>
  getReminders: (size: number, page: number) => Promise<Reminder[]>
  updateReminder: (reminder: Reminder) => Promise<Reminder | null>
  createReminder: (reminder: Reminder) => Promise<Reminder | null>
  deleteReminder: (id: number) => Promise<boolean>
  getReminderCount: () => Promise<number>
}
