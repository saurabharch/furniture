import { IBaseRepository } from '../../domain/common/database/interfaces/IBaseRepository';
import { Medicine } from '../../domain/entities/Medicine';

export interface IMedicineRepository extends IBaseRepository<Medicine, string> {
    checkNameExist(name: string): Promise<boolean>;
    checkNameExist(name: string, excludeId: string): Promise<boolean>;
}
