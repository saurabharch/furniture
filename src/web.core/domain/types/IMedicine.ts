import { IEntity } from './base/IEntity';

export interface IMedicine extends IEntity {
    id: string;
    name: string;
    price: number;
}
