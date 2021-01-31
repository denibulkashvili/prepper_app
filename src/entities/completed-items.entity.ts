import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ItemEntity } from './item.entity'
import { SubscriptionEntity } from './subscription.entity'

@ObjectType()
@Entity({ name: 'completed_items' })
export class CompletedItemEntity extends BaseEntity {
  @Column()
  itemId: number

  @Field(() => ItemEntity)
  @ManyToOne(() => ItemEntity)
  @JoinColumn({ name: 'itemId', referencedColumnName: 'id' })
  item: ItemEntity

  @Column()
  subscriptionId: number

  @Field(() => SubscriptionEntity)
  @ManyToOne(() => SubscriptionEntity)
  @JoinColumn({ name: 'subscriptionId', referencedColumnName: 'id' })
  subscription: SubscriptionEntity
}
