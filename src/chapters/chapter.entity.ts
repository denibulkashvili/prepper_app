import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../entities/base.entity'
import { ItemEntity } from '../entities/item.entity'

export const ChapterRelations = ['items']
@ObjectType()
@Entity({ name: 'chapters' })
export class ChapterEntity extends BaseEntity {
  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field(() => [ItemEntity])
  @OneToMany(() => ItemEntity, item => item.chapter)
  items: ItemEntity[]
}
