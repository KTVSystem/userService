import { RolesListDto } from '../dtos/roles-list-dto';

export const roles: Array<RolesListDto> = [
  {key: 'ROLE_USER', title: 'User'},
  {key: 'ROLE_ADMIN', title: 'Admin'},
  {key: 'ROLE_SUPER_ADMIN', title: 'Super Admin'},
  {key: '$ROLE_BLOG_MODERATOR', title: 'Blog Moderator'},
  {key: '$ROLE_SUPER_BLOG_MODERATOR', title: 'Super Blog Moderator'},
];
