import { Inject, Service } from 'typedi';
import { GetMedicineByIdQuery } from './GetMedicineByIdQuery';
import { GetMedicineByIdResult } from './GetMedicineByIdResult';
import { IMedicineRepository } from '../../../../gateways/repositories/IMedicineRepository';
import { IQueryHandler } from '../../../../domain/common/interactor/interfaces/IQueryHandler';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';

@Service()
export class GetMedicineByIdQueryHandler implements IQueryHandler<GetMedicineByIdQuery, GetMedicineByIdResult> {
    @Inject('medicine.repository')
    private readonly _medicineRepository: IMedicineRepository;

    async handle(param: GetMedicineByIdQuery): Promise<GetMedicineByIdResult> {
        if (!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');

        const medicine = await this._medicineRepository.getById(param.id);
        if (!medicine)
            throw new SystemError(MessageError.DATA_NOT_FOUND);

        return new GetMedicineByIdResult(medicine);
    }
}
