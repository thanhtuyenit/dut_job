import { Role } from '../model/role';
import { Faculty } from './faculty';
import { Keyskill } from './keyskills';
export class Profile {
    id: number;
    userID: number;
    faculty: Faculty;
    fullname: string;
    dob: string;
    address: string;
    phone: string;
    avatar: string;
    aboutMe: string;
    cvLink: string;
    website: string;
}
