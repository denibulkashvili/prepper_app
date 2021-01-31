import { Args, Mutation, Query, Resolver } from 'type-graphql'
import { CreateChapterArgs, IdArgs, UpdateChapterArgs } from '../dto'
import { ChapterEntity } from './chapter.entity'
import { ChaptersService } from './chapters.service'

@Resolver()
export class ChaptersResolver {
  private chaptersService = new ChaptersService()

  @Query(() => [ChapterEntity])
  chapters(): Promise<ChapterEntity[]> {
    return this.chaptersService.getChapters()
  }

  @Query(() => ChapterEntity)
  async chapter(@Args(() => IdArgs) args: IdArgs): Promise<ChapterEntity> {
    return this.chaptersService.getChapter(args)
  }

  @Mutation(() => ChapterEntity)
  async createChapter(@Args() args: CreateChapterArgs): Promise<ChapterEntity> {
    return this.chaptersService.createChapter(args)
  }

  @Mutation(() => ChapterEntity)
  async updateChapter(@Args() args: UpdateChapterArgs): Promise<ChapterEntity> {
    return this.chaptersService.updateChapter(args)
  }

  @Mutation(() => Boolean)
  async deleteChapter(@Args() args: IdArgs): Promise<boolean> {
    return this.chaptersService.deleteChapter(args)
  }
}
