import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDbEntity } from './base/BaseDBEntity';
import { IMedicine } from '../../../../web.core/domain/types/IMedicine';
import { MEDICINE_SCHEMA } from '../schemas/MedicineSchema';
import { Medicine } from '../../../../web.core/domain/entities/Medicine';

@Entity(MEDICINE_SCHEMA.TABLE_NAME)
@Index((medicine: MedicineDb) => [medicine.name, medicine.deletedAt], { unique: true })
export class MedicineDb extends BaseDbEntity<Medicine> implements IMedicine {
    @PrimaryGeneratedColumn('uuid', { name: MEDICINE_SCHEMA.COLUMNS.ID })
    id: string;

    @Column({ name: MEDICINE_SCHEMA.COLUMNS.NAME, length: 50 })
    name: string;

    @Column()
    price: number;

    /* handlers */

    toEntity(): Medicine {
        return new Medicine(this);
    }

    fromEntity(entity: Medicine): this {
        const data = entity.toData();

        if (data.id !== undefined)
            this.id = data.id;

        if (data.name !== undefined)
            this.name = data.name;

        if (data.price !== undefined)
            this.price = data.price;

        return this;
    }
}
