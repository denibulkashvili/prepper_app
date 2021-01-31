import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ChapterEntity } from '../chapters/chapter.entity'
import { BaseEntity } from './base.entity'
import { CompletedItemEntity } from './completed-items.entity'
import { UserEntity } from './user.entity'

@ObjectType()
@Entity({ name: 'subscriptions' })
export class SubscriptionEntity extends BaseEntity {
  @Column()
  userId: string

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user: UserEntity

  @Column()
  chapterId: number

  @Field(() => ChapterEntity)
  @ManyToOne(() => ChapterEntity)
  @JoinColumn({ name: 'chapterId', referencedColumnName: 'id' })
  chapter: ChapterEntity

  @Field(() => [CompletedItemEntity])
  @OneToMany(() => CompletedItemEntity, item => item.subscription)
  completedItems: CompletedItemEntity[]
}
