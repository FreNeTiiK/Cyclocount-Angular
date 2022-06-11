
export interface ActivityPush {
    user_id: number;
    equipment_id: number;
    activity_type_id: number;
    title: string;
    description: string|null;
    departure_time: string|null;
    arrival_time: string|null;
    speed_average: number;
    speed_max: number;
    height_difference: number|null;
    power_average: number|null;
    calories_consumed: number|null;
}
