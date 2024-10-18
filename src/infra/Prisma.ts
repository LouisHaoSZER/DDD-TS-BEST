import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function disconnect() {
  await prisma.$disconnect()
}

export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
export type NullablePick<T, K extends keyof T> = {
  [P in K]: T[P] | null;
} & Omit<T, K>
