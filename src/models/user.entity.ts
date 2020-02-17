import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

export enum UserStateEnum {
  DISABLED,
  NOT_VERIFIED,
  VERIFIED,
}
export enum UserRoleEnum {
  ADMIN,
  CLINICIAN,
  PATIENT,
}

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStateEnum,
    default: UserStateEnum.NOT_VERIFIED,
    nullable: false,
  })
  userState: UserStateEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
  })
  userRole: UserRoleEnum;

  @Column()
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName?: string;
}
