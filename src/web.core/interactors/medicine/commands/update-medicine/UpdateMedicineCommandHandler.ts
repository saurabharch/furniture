import { Inject, Service } from 'typedi';
import { ICommandHandler } from '../../../../domain/common/interactor/interfaces/ICommandHandler';
import { IMedicineRepository } from '../../../../gateways/repositories/IMedicineRepository';
import { Medicine } from '../../../../domain/entities/Medicine';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { UpdateMedicineCommand } from './UpdateMedicineCommand';

@Service()
export class UpdateMedicineCommandHandler implements ICommandHandler<UpdateMedicineCommand, boolean> {
    @Inject('medicine.repository')
    private readonly _medicineRepository: IMedicineRepository;

    async handle(param: UpdateMedicineCommand): Promise<boolean> {
        if (!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');

        const data = new Medicine();
        data.name = param.name;

        const isExist = await this._medicineRepository.checkNameExist(data.name, param.id);
        if (isExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'name');

        const hasSucceed = await this._medicineRepository.update(param.id, data);
        if (!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}
