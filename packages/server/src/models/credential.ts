export interface Group {
  groupid: string;
}

type RoleType<r> = { $role: r };

export type UserRole = RoleType<"User">;
export type AdminRole = RoleType<"Admin">;
export type GroupMemberRole = RoleType<"GroupMember"> & Group;
export type GroupAdminRole = RoleType<"GroupAdmin"> & Group;

export type Role =
  | UserRole
  | AdminRole
  | GroupMemberRole
  | GroupAdminRole;

export interface Credential {
  username: string;
  hashedPassword: string;
  roles: Role[];
}
