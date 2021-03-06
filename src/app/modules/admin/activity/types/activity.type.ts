import {User} from 'app/core/user/types/user.type';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';
import {Difficulty} from "./difficulty.type";

export interface Activity {
    id: number;
    title: string;
    description: string;
    departure_time: string;
    arrival_time: string;
    distance: number;
    speed_average: number;
    speed_max: number;
    height_difference: number;
    power_average: number;
    calories_consumed: number;
    activity_type: ActivityType;
    equipment: Equipment | null;
    difficulty: Difficulty | null;
    user_link: User;
}
