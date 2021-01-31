import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ChapterEntity } from '../chapters'
import { BaseEntity } from './base.entity'

enum ItemType {
  ARTICLE = 'article',
  VIDEO = 'video',
  BOOK = 'book',
  COURSE = 'course',
  OTHER = 'other',
}

registerEnumType(ItemType, {
  name: 'ItemType',
})

@ObjectType()
@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Column()
  chapterId: number

  @Field(() => [ChapterEntity])
  @ManyToOne(() => ChapterEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chapterId', referencedColumnName: 'id' })
  chapter: ChapterEntity

  @Field({ nullable: true })
  @Column({ nullable: true })
  url?: string

  @Field(() => ItemType)
  @Column({ type: 'enum', enum: ItemType, default: ItemType.OTHER })
  type: ItemType
}
