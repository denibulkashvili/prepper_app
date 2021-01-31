import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { SubscriptionEntity } from './subscription.entity'

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  ssoId: string

  @Field(() => [SubscriptionEntity])
  @OneToMany(() => SubscriptionEntity, sub => sub.user)
  subscriptions: SubscriptionEntity[]
}
