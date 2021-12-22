export interface RoleCreateDto {
  name: string;
  status: string;
  permissions?: Array<string>;
}
