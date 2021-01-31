import { Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class IdArgs {
  @Min(1)
  @Field(() => Int)
  id: number
}
