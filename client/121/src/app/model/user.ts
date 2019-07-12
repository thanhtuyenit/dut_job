import { Role } from '../model/role';
import { Faculty } from './faculty';
import { Keyskill } from './keyskills';
import { Profile } from './profile';
export class User {
    id: number;
    userID: number;
    username: string;
    password: string;
    NewPassword: string;
    OldPassword: string;
    isActive: boolean;
    isReceiveEmail: boolean;
    role: Role;
    fullname: string;
    faculty: Faculty;
    // keyskill: Keyskill;
    fullName: string;
    dob: string;
    address: string;
    phone: string;
    avatar: string;
    aboutMe: string;
    cvLink: string;
    website: string;
    skills: Keyskill[];
    // profile: Profile;
    // facultyid: number;
}
