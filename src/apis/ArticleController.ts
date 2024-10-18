import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, UseBefore } from 'routing-controllers'
import { injectable } from 'tsyringe'
import { ArticleCmd } from '../application/command/ArticleCmd.js'
import { ArticleQuery } from '../application/query/ArticleQuery.js'
import { AuthMiddleWare } from '../bootstrap/AuthMiddleWare.js'
import type { ArticleCO } from '../client/response/ArticleCO.js'
import type { CreateArticleRO, UpdateArticleRO } from '../client/request/ArticleRO.js'
import { ResponseBuilder } from '../util/ResponseBuilder.js'
import { Response } from '../util/Response.js'
import { BaseController } from './BaseController.js'

@JsonController('/article')
@UseBefore(AuthMiddleWare)
@injectable()
export class ArticleController extends BaseController {
  constructor(
    private articleQuery: ArticleQuery,
    private articleCmd: ArticleCmd,
  ) {
    super()
  }

  @Get('/get/:id')
  async getArticle(@Param('id') id: number): Promise<Response<ArticleCO | null>> {
    const res = await this.articleQuery.getArticle(id)
    if (!res) {
      return ResponseBuilder.buildFailure<null>(1, '未找到文章').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Get('/list')
  async getArticles(@QueryParam('size') size: number, @QueryParam('page') page: number): Promise<Response<ArticleCO[] | null>> {
    const res = await this.articleQuery.getArticles(size, page)
    if (!res?.length) {
      return ResponseBuilder.buildFailure<null>(1, '未找到文章').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Post('/create')
  @Authorized()
  async createArticle(@Body() article: CreateArticleRO): Promise<Response<ArticleCO | null>> {
    const res = await this.articleCmd.createArticle(article)
    return ResponseBuilder.buildSuccess(res)
  }

  @Put('/update/:id')
  @Authorized()
  async updateArticle(@Body() article: UpdateArticleRO): Promise<Response<ArticleCO | null>> {
    const res = await this.articleCmd.updateArticle(article)
    return ResponseBuilder.buildSuccess(res)
  }

  @Delete('/delete/:id')
  @Authorized()
  async deleteArticle(@Param('id') id: number): Promise<Response<void | null>> {
    await this.articleCmd.deleteArticle(id)
    return ResponseBuilder.buildSuccess(null)
  }
}
