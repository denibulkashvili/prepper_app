import { ArgsType, Field } from 'type-graphql'
import { ChapterEntity } from '../chapters'
import { IdArgs } from './base.dto'

@ArgsType()
export class CreateChapterArgs implements Pick<ChapterEntity, 'title' | 'description'> {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string
}

@ArgsType()
export class UpdateChapterArgs extends IdArgs {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string
}
