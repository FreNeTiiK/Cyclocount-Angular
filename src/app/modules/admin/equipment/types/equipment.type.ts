import {User} from 'app/core/user/user.type';

export interface Equipment {
    id: number;
    name: string;
    user_link: User;
}
