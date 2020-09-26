import { Inject, Service } from 'typedi';
import { FindMedicineQuery } from './FindMedicineQuery';
import { FindMedicineResult } from './FindMedicineResult';
import { IMedicineRepository } from '../../../../gateways/repositories/IMedicineRepository';
import { IQueryHandler } from '../../../../domain/common/interactor/interfaces/IQueryHandler';
import { PaginationResult } from '../../../../domain/common/interactor/PaginationResult';

@Service()
export class FindMedicineQueryHandler implements IQueryHandler<FindMedicineQuery, PaginationResult<FindMedicineResult>> {
    @Inject('medicine.repository')
    private readonly _medicineRepository: IMedicineRepository;

    async handle(param: FindMedicineQuery): Promise<PaginationResult<FindMedicineResult>> {
        const [medicines, count] = await this._medicineRepository.findAndCount(param);
        const list = medicines.map(medicine => new FindMedicineResult(medicine));

        return new PaginationResult(list, count, param.skip, param.limit);
    }
}
