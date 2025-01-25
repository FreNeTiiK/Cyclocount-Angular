export interface ActivityPush {
    userId: number;
    equipmentId: number;
    activityTypeId: number;
    difficultyId: number;
    distance: number;
    title: string;
    description: string|null;
    departureTime: string|null;
    arrivalTime: string|null;
    speedAverage: number;
    speedMax: number;
    heightDifference: number|null;
    powerAverage: number|null;
    caloriesConsumed: number|null;
}
