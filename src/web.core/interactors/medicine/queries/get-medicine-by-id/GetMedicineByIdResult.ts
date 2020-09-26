import { Medicine } from '../../../../domain/entities/Medicine';

export class GetMedicineByIdResult {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    name: string;

    constructor(data: Medicine) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.name = data.name;
    }
}
