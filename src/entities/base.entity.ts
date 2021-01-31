import { Field, Int, ObjectType } from 'type-graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
export class BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
