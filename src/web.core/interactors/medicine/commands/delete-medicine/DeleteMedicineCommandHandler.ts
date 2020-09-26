import { Inject, Service } from 'typedi';
import { DeleteMedicineCommand } from './DeleteMedicineCommand';
import { ICommandHandler } from '../../../../domain/common/interactor/interfaces/ICommandHandler';
import { IMedicineRepository } from '../../../../gateways/repositories/IMedicineRepository';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';

@Service()
export class DeleteMedicineCommandHandler implements ICommandHandler<DeleteMedicineCommand, boolean> {
    @Inject('medicine.repository')
    private readonly _medicineRepository: IMedicineRepository;

    async handle(param: DeleteMedicineCommand): Promise<boolean> {
        if (!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');

        const medicine = await this._medicineRepository.getById(param.id);
        if (!medicine)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'medicine');

        const hasSucceed = await this._medicineRepository.delete(param.id);
        if (!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}
