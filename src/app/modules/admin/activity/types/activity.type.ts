import {User} from 'app/core/user/types/user.type';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';
import {Difficulty} from "./difficulty.type";

export interface Activity {
    id: number;
    title: string;
    description: string;
    departureTime: string;
    arrivalTime: string;
    distance: number;
    speedAverage: number;
    speedMax: number;
    heightDifference: number;
    powerAverage: number;
    caloriesConsumed: number;
    activityType: ActivityType;
    equipment: Equipment | null;
    difficulty: Difficulty | null;
    userLink: User;
}
