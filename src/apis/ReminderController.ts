import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, UseBefore } from 'routing-controllers'
import { injectable } from 'tsyringe'
import { ReminderCmd } from '../application/command/ReminderCmd.js'
import { ReminderQuery } from '../application/query/RemindQuert.js'
import { AuthMiddleWare } from '../bootstrap/AuthMiddleWare.js'
import type { ReminderCO } from '../client/response/ReminderCO.js'
import type { CreateReminderRO, UpdateReminderRO } from '../client/request/ReminderRO.js'
import { ResponseBuilder } from '../util/ResponseBuilder.js'
import { Response } from '../util/Response.js'
import { BaseController } from './BaseController.js'

@JsonController('/reminder')
@UseBefore(AuthMiddleWare)
@injectable()
export class ReminderController extends BaseController {
  constructor(
    private reminderQuery: ReminderQuery,
    private reminderCmd: ReminderCmd,
  ) {
    super()
  }

  @Get('/get/:id')
  async getReminder(@Param('id') id: number): Promise<Response<ReminderCO | null>> {
    const res = await this.reminderQuery.getReminder(id)
    if (!res) {
      return ResponseBuilder.buildFailure<null>(1, '未找到提醒').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Get('/list')
  async getReminders(@QueryParam('size') size: number, @QueryParam('page') page: number): Promise<Response<ReminderCO[] | null>> {
    const res = await this.reminderQuery.getReminders(size, page)
    if (!res?.length) {
      return ResponseBuilder.buildFailure<null>(1, '未找到提醒').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Post('/create')
  @Authorized()
  async createReminder(@Body() reminder: CreateReminderRO): Promise<Response<ReminderCO | null>> {
    const res = await this.reminderCmd.createReminder(reminder)
    if (!res) {
      return ResponseBuilder.buildFailure<null>(1, '创建提醒失败').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Put('/update/:id')
  @Authorized()
  async updateReminder(@Body() reminder: UpdateReminderRO): Promise<Response<ReminderCO | null>> {
    const res = await this.reminderCmd.updateReminder(reminder)
    if (!res) {
      return ResponseBuilder.buildFailure<null>(1, '更新提醒失败').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Delete('/delete/:id')
  @Authorized()
  async deleteReminder(@Param('id') id: number): Promise<Response<void | null>> {
    await this.reminderCmd.deleteReminder(id)
    return ResponseBuilder.buildSuccess(null)
  }
}
