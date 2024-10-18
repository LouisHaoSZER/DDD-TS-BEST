import { injectable } from 'tsyringe'
import { ReminderRepo } from '../../infra/reminder/ReminderRepo.js'
import { ReminderCO } from '../../client/response/ReminderCO.js'

@injectable()
export class ReminderQuery {
  constructor(
    public reminderRepo: ReminderRepo,
  ) {}

  async getReminder(id: number): Promise<ReminderCO | null> {
    return await this.reminderRepo.getReminder(id)
  }

  async getReminders(size: number, page: number): Promise<ReminderCO[]> {
    return await this.reminderRepo.getReminders(size, page)
  }
}
