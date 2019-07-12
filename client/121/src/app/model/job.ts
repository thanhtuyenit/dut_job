import { Faculty } from './faculty';
import { Keyskill } from './keyskills';
import { Role } from './role';
import { Company } from './company';
import { JobType } from './jobType';

export class Job {
    id: number;
    title: string;
    isDisplay: boolean;
    numberView: number;
    reason: string;
    description: string;
    experience: string;
    role: Role;
    benefit: string;
    faculties: Faculty[];
    skills: Keyskill[];
    dateExpire: string;
    salary: string;
    jobType: JobType ;
    company: Company;
    jobTypeID: number;
    facultyID: number;
    faculty: Faculty;
}
