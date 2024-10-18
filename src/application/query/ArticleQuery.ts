import { injectable } from 'tsyringe'
import { ArticleRepo } from '../../infra/article/ArticleRepo.js'
import { ArticleCO } from '../../client/response/ArticleCO.js'

@injectable()
export class ArticleQuery {
  constructor(
    public articleRepo: ArticleRepo,
  ) {}

  async getArticle(id: number): Promise<ArticleCO | null> {
    return await this.articleRepo.getArticle(id)
  }

  async getArticles(size: number, page: number): Promise<ArticleCO[]> {
    return await this.articleRepo.getArticles(size, page)
  }
}
