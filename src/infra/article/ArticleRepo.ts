import type { IArticleRepo } from '../../domain/article/IArticleRepo.js'
import { prisma } from '../Prisma.js'
import type { CreateArticleRO, UpdateArticleRO } from '../../client/request/ArticleRO.js'
import type { ArticleCO } from '../../client/response/ArticleCO.js'

export class ArticleRepo implements IArticleRepo {
  /**
   * 获取文章
   * @param id 文章id
   * @returns 文章
   */
  getArticle: (id: number) => Promise<ArticleCO | null> = async (id) => {
    try {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          author: true,
        },
      })
      if (!article)
        return null

      return {
        id: article.id,
        title: article.title,
        content: article.content,
        authorId: article.authorId,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      }
    }
    catch (error) {
      console.error('获取文章失败:', error)
      return null
    }
  }

  /**
   * 获取文章列表
   * @param size 每页数量
   * @param page 页码
   * @returns 文章列表
   */
  getArticles: (size: number, page: number) => Promise<ArticleCO[]> = async (size, page) => {
    try {
      const articles = await prisma.article.findMany({
        take: size,
        skip: (page - 1) * size,
        include: {
          author: true,
        },
      })
      return articles.map((article) => {
        return {
          id: article.id,
          title: article.title,
          content: article.content,
          authorId: article.authorId,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        }
      })
    }
    catch (error) {
      console.error('获取文章失败:', error)
      return []
    }
  }

  /**
   * 更新文章
   * @param article 文章
   */
  updateArticle: (article: UpdateArticleRO) => Promise<ArticleCO | null> = async (article) => {
    try {
      const updatedArticle = await prisma.article.update({
        where: { id: article.id },
        data: {
          title: article.title,
          content: article.content,
          authorId: article.authorId,
        },
      })
      return {
        id: updatedArticle.id,
        title: updatedArticle.title,
        content: updatedArticle.content,
        authorId: updatedArticle.authorId,
        createdAt: updatedArticle.createdAt,
        updatedAt: updatedArticle.updatedAt,
      }
    }
    catch (error) {
      console.error('更新文章失败:', error)
      return null
    }
  }

  /**
   * 创建文章
   * @param article 文章
   */
  createArticle: (article: CreateArticleRO) => Promise<ArticleCO | null> = async (article) => {
    try {
      const newArticle = await prisma.article.create({
        data: {
          ...article,
          authorId: article.authorId,
        },
      })
      return {
        id: newArticle.id,
        title: newArticle.title,
        content: newArticle.content,
        authorId: newArticle.authorId,
        createdAt: newArticle.createdAt,
        updatedAt: newArticle.updatedAt,
      }
    }
    catch (error) {
      console.error('创建文章失败:', error)
      return null
    }
  }

  /**
   * 删除文章
   * @param id 文章id
   */
  deleteArticle: (id: number) => Promise<boolean > = async (id) => {
    try {
      await prisma.article.delete({
        where: { id },
      })
      return true
    }
    catch (error) {
      return false
    }
  }

  /**
   * 获取文章数量
   * @returns 文章数量
   */
  getArticleCount: () => Promise<number> = async () => {
    return await prisma.article.count()
  }
}
