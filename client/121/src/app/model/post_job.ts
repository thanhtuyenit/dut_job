import { Faculty } from './faculty';
import { Keyskill } from './keyskills';
import { Role } from './role';
import { TypeJob } from './typeJob';

export class Post {
    id: number;
    userID: number;
    username: string;
    password: string;
    title: string;
    reason: string;
    description: string;
    experience: string;
    role: Role;
    benefit: string;
    faculties: Faculty;
    skills: Keyskill;
dateExpire: string;
    salary: string;
typeJob: TypeJob ;
}
