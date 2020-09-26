import { BaseRepository } from './base/BaseRepository';
import { FindMedicineQuery } from '../../../../web.core/interactors/medicine/queries/find-medicine/FindMedicineQuery';
import { IMedicineRepository } from '../../../../web.core/gateways/repositories/IMedicineRepository';
import { MEDICINE_SCHEMA } from '../schemas/MedicineSchema';
import { Medicine } from '../../../../web.core/domain/entities/Medicine';
import { MedicineDb } from '../entities/MedicineDb';
import { Service } from 'typedi';
import { SortType } from '../../../../web.core/domain/common/database/SortType';

@Service('medicine.repository')
export class MedicineRepository extends BaseRepository<Medicine, MedicineDb, string> implements IMedicineRepository {
    constructor() {
        super(MedicineDb, MEDICINE_SCHEMA);
    }

    async findAndCount(param: FindMedicineQuery): Promise<[Medicine[], number]> {
        let query = this.repository.createQueryBuilder(MEDICINE_SCHEMA.TABLE_NAME);

        if (param.keyword) {
            const keyword = `%${param.keyword}%`;
            query = query.andWhere(`${MEDICINE_SCHEMA.TABLE_NAME}.${MEDICINE_SCHEMA.COLUMNS.NAME} ILIKE :keyword`, { keyword });
        }

        query = query
            .orderBy(`${MEDICINE_SCHEMA.TABLE_NAME}.${MEDICINE_SCHEMA.COLUMNS.NAME}`, SortType.ASC)
            .skip(param.skip)
            .take(param.limit);

        const [list, count] = await query.getManyAndCount();
        return [list.map(item => item.toEntity()), count];
    }

    async checkNameExist(name: string, excludeId?: string): Promise<boolean> {
        let query = this.repository.createQueryBuilder(MEDICINE_SCHEMA.TABLE_NAME)
            .where(`lower(${MEDICINE_SCHEMA.TABLE_NAME}.${MEDICINE_SCHEMA.COLUMNS.NAME}) = lower(:name)`, { name });

        if (excludeId)
            query = query.andWhere(`${MEDICINE_SCHEMA.TABLE_NAME}.${MEDICINE_SCHEMA.COLUMNS.ID} != :id`, { id: excludeId });

        const result = await query.getOne();
        return !!result;
    }
}
