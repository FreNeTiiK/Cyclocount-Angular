import {User} from 'app/core/user/user.type';

export interface Activity {
    id: number;
    title: string;
    description: string;
    departure_time: string;
    arrival_time: string;
    speed_average: number;
    speed_max: number;
    height_difference: number;
    power_average: number;
    calories_consumed: number;
    user_link: User;
}
