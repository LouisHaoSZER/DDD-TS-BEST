import { injectable } from 'tsyringe'
import { ReminderRepo } from '../../infra/reminder/ReminderRepo.js'
import { CreateReminderRO, UpdateReminderRO } from '../../client/request/ReminderRO.js'
import { Reminder } from '../../domain/reminder/Reminder.js'

@injectable()
export class ReminderCmd {
  constructor(
    public reminderRepo: ReminderRepo,
  ) {}

  async updateReminder(data: UpdateReminderRO): Promise<Reminder | null> {
    return await this.reminderRepo.updateReminder(data)
  }

  async createReminder(data: CreateReminderRO): Promise<Reminder | null> {
    return await this.reminderRepo.createReminder(data)
  }

  async deleteReminder(id: number): Promise<boolean> {
    return await this.reminderRepo.deleteReminder(id)
  }
}
