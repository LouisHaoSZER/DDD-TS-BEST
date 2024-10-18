import { prisma } from '../Prisma.js'
import type { CreateReminderRO, UpdateReminderRO } from '../../client/request/ReminderRO.js'
// import type { ReminderCO } from '../../client/response/ReminderCO.js'
import type { IReminderRepo } from '../../domain/reminder/IReminderRepo.js'
import type { Reminder } from '../../domain/reminder/Reminder.js'

export class ReminderRepo implements IReminderRepo {
  /**
   * 获取提醒
   * @param id 提醒id
   * @returns 提醒
   */
  getReminder: (id: number) => Promise<Reminder | null> = async (id: number) => {
    try {
      const reminder = await prisma.reminder.findUnique({
        where: { id },
        include: {
          creator: true,
        },
      })
      if (!reminder)
        return null

      return {
        id: reminder.id,
        title: reminder.title,
        content: reminder.content,
        creatorId: reminder.creatorId,
        creator: reminder.creator,
        dueDate: reminder.dueDate,
        createdAt: reminder.createdAt,
        updatedAt: reminder.updatedAt,
      }
    }
    catch (error) {
      console.error('获取提醒失败:', error)
      return null
    }
  }

  /**
   * 获取文章列表
   * @param size 每页数量
   * @param page 页码
   * @returns 文章列表
   */
  getReminders: (size: number, page: number) => Promise<Reminder[]> = async (size, page) => {
    try {
      const reminders = await prisma.reminder.findMany({
        take: size,
        skip: (page - 1) * size,
        include: {
          creator: true,
        },
      })
      return reminders.map((reminder) => {
        return {
          id: reminder.id,
          title: reminder.title,
          content: reminder.content,
          creatorId: reminder.creatorId,
          creator: reminder.creator,
          dueDate: reminder.dueDate,
          createdAt: reminder.createdAt,
          updatedAt: reminder.updatedAt,
        }
      })
    }
    catch (error) {
      console.error('获取提醒失败:', error)
      return []
    }
  }

  /**
   * 更新提醒
   * @param reminder 提醒
   */
  updateReminder: (reminder: UpdateReminderRO) => Promise<Reminder | null> = async (reminder) => {
    try {
      const updatedReminder = await prisma.reminder.update({
        where: { id: reminder.id },
        data: {
          title: reminder.title,
          content: reminder.content,
          creatorId: reminder.creatorId,
          dueDate: reminder.dueDate,
        },
      })
      return {
        id: updatedReminder.id,
        title: updatedReminder.title,
        content: updatedReminder.content,
        creatorId: updatedReminder.creatorId,
        dueDate: updatedReminder.dueDate,
        createdAt: updatedReminder.createdAt,
        updatedAt: updatedReminder.updatedAt,
      }
    }
    catch (error) {
      console.error('更新提醒失败:', error)
      return null
    }
  }

  /**
   * 创建提醒
   * @param reminder 提醒
   */
  createReminder: (reminder: CreateReminderRO) => Promise<Reminder | null> = async (reminder) => {
    try {
      const newReminder = await prisma.reminder.create({
        data: {
          ...reminder,
          creatorId: reminder.creatorId,
        },
        include: {
          creator: true,
        },
      })
      return {
        id: newReminder.id,
        title: newReminder.title,
        content: newReminder.content,
        creatorId: newReminder.creatorId,
        creator: newReminder.creator,
        dueDate: newReminder.dueDate,
        createdAt: newReminder.createdAt,
        updatedAt: newReminder.updatedAt,
      }
    }
    catch (error) {
      console.error('创建提醒失败:', error)

      return null
    }
  }

  /**
   * 删除提醒
   * @param id 提醒id
   */
  deleteReminder: (id: number) => Promise<boolean> = async (id) => {
    try {
      await prisma.reminder.delete({
        where: { id },
      })
      return true
    }
    catch (error) {
      console.error('删除提醒失败:', error)
      return false
    }
  }

  /**
   * 获取提醒数量
   * @returns 提醒数量
   */
  getReminderCount: () => Promise<number> = async () => {
    return await prisma.reminder.count()
  }
}
