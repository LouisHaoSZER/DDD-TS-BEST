import { injectable } from 'tsyringe'
import { ArticleRepo } from '../../infra/article/ArticleRepo.js'
import { CreateArticleRO, UpdateArticleRO } from '../../client/request/ArticleRO.js'
import { Article } from '../../domain/article/Article.js'

@injectable()
export class ArticleCmd {
  constructor(
    public articleRepo: ArticleRepo,
  ) {}

  async updateArticle(data: UpdateArticleRO): Promise<Article | null> {
    return await this.articleRepo.updateArticle(data)
  }

  async createArticle(data: CreateArticleRO): Promise<Article | null> {
    return await this.articleRepo.createArticle(data)
  }

  async deleteArticle(id: number): Promise<boolean> {
    return await this.articleRepo.deleteArticle(id)
  }
}
