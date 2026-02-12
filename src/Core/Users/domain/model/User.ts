export type UserStatus = "ACTIVE" | "INACTIVE";

type FamilyGroup = {
  id: string;
  name: string;
  color: string | undefined;
  teacher: string | undefined;
  anfitrion: string;
  leaders: string[] | undefined;
  meetingDay: string | undefined;
  meetingTime: string | undefined;
};

export class User {
  id: string | null;
  name: string;
  email: string;
  familyGroup: FamilyGroup;
  role: string[];
  status: UserStatus;
  constructor(
    id: string | null,
    name: string,
    email: string,
    familyGroup: FamilyGroup,
    role: string[],
    status: UserStatus,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.familyGroup = familyGroup;
    this.role = role;
    this.status = status;
  }
}
export class CreateUserRequest {
  constructor(
    readonly id: string | null,
    readonly name: string,
    readonly email: string,
    readonly familyGroup: FamilyGroup,
    readonly role: string,
    readonly status: UserStatus,
    readonly password: string,
  ) {}
}
