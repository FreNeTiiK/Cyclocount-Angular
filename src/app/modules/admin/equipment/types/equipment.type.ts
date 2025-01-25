import {User} from 'app/core/user/types/user.type';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';

export interface Equipment {
    id: number;
    name: string;
    activityType: ActivityType;
    userLink: User;
}
