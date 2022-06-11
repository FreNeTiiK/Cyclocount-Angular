import {User} from 'app/core/user/user.type';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';

export interface Equipment {
    id: number;
    name: string;
    activity_type: ActivityType;
    user_link: User;
}
