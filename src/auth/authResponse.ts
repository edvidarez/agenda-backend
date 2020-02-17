import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  sessionToken: string;
}
