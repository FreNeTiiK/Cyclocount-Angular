import {User} from 'app/core/user/types/user.type';
import {TypeObjective} from 'app/modules/admin/annual-objective/types/type-objective.type';

export interface AnnualObjective {
    id: number;
    name: string;
    quantity: number;
    typeObjective: TypeObjective;
    userLink: User;
}
