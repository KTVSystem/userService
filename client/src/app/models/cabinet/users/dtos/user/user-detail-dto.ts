import { Permission } from '../../permission';
import { Role } from '../../role';
import { SocialUser } from '../../../../login/social-user';

export interface UserDetailDto {
  email: string;
  _id: string;
  role: Role;
  socials: Array<SocialUser>;
  permission: Array<Permission>;
  status: string;
}
