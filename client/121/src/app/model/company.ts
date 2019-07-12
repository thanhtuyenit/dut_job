import { Role } from '../model/role';
import { Faculty } from './faculty';
import { Keyskill } from './keyskills';
import { User } from './user';
import { OvertimeType } from './overtimeType';
export class Company {
    id: number;
    user: User;
    name: string;
    address: string;
    phone: string;
    avatar: string;
    timeWorkFrom: string;
    timeWorkTo: string;
    employeeFrom: number;
    employeeTo: number;
    description: string;
    title: string;
    overtimeType: OvertimeType;
    isActive: boolean;
    faculty: Faculty;
    skills: Keyskill[];
    website: string;
    email: string;
    username: string;
    facultyID: number;
}
