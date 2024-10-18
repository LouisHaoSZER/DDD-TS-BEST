import type { CreateArticleRO, UpdateArticleRO } from '../../client/request/ArticleRO.js'
import type { Article } from './Article.js'

export interface IArticleRepo {
  getArticle: (id: number) => Promise<Article | null>
  getArticles: (size: number, page: number) => Promise<Article[]>
  updateArticle: (article: UpdateArticleRO) => Promise<Article | null>
  createArticle: (article: CreateArticleRO) => Promise<Article | null>
  deleteArticle: (id: number) => Promise<boolean>
  getArticleCount: () => Promise<number>
}
