import { CreateChapterArgs, IdArgs, UpdateChapterArgs } from 'src/dto'
import { EntityManager, getRepository } from 'typeorm'
import { ChapterEntity, ChapterRelations } from './chapter.entity'

export class ChaptersService {
  private chaptersRepo = getRepository(ChapterEntity)

  getChapters = (): Promise<ChapterEntity[]> =>
    this.chaptersRepo.find({ relations: ChapterRelations, order: { createdAt: 'ASC' } })

  getChapter = ({ id }: IdArgs): Promise<ChapterEntity> => this.getChapterById(id)

  createChapter = ({ title, description }: CreateChapterArgs): Promise<ChapterEntity> =>
    this.chaptersRepo.manager.connection.transaction(async trx => {
      await this.findDuplicate(title, trx)
      const repo = trx.getRepository(ChapterEntity)
      const { id } = await repo.save(repo.create({ title, description }))
      return this.getChapterById(id, trx)
    })

  updateChapter = ({ id, title, description }: UpdateChapterArgs): Promise<ChapterEntity> => {
    return this.chaptersRepo.manager.transaction(async trx => {
      const repo = trx.getRepository(ChapterEntity)
      title && (await this.findDuplicate(title, trx))
      await repo.save({ id, title, description })
      return this.getChapterById(id, trx)
    })
  }

  deleteChapter = ({ id }: IdArgs): Promise<boolean> => {
    return this.chaptersRepo.manager.transaction(async trx => {
      const chapter = await this.getChapterById(id, trx)
      await trx.getRepository(ChapterEntity).remove(chapter)
      return true
    })
  }

  private getChapterById = async (id: number, trx?: EntityManager): Promise<ChapterEntity> => {
    const em = trx || this.chaptersRepo.manager
    const chapter = await em.getRepository(ChapterEntity).findOne(id, { relations: ChapterRelations })
    if (!chapter) {
      throw new Error('Chapter not found')
    }
    return chapter
  }

  private findDuplicate = async (title: string, trx?: EntityManager): Promise<void> => {
    const em = trx || this.chaptersRepo.manager
    const exists = await em.getRepository(ChapterEntity).findOne({ title })
    if (exists) {
      throw new Error('Chapter with this title already exists')
    }
  }
}
