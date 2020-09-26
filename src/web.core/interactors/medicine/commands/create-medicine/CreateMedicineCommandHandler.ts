import { Inject, Service } from 'typedi';
import { CreateMedicineCommand } from './CreateMedicineCommand';
import { ICommandHandler } from '../../../../domain/common/interactor/interfaces/ICommandHandler';
import { IMedicineRepository } from '../../../../gateways/repositories/IMedicineRepository';
import { Medicine } from '../../../../domain/entities/Medicine';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';

@Service()
export class CreateMedicineCommandHandler implements ICommandHandler<CreateMedicineCommand, string> {
    @Inject('medicine.repository')
    private readonly _medicineRepository: IMedicineRepository;

    async handle(param: CreateMedicineCommand): Promise<string> {
        const data = new Medicine();
        data.name = param.name;
        data.price = param.price;
        const isExist = await this._medicineRepository.checkNameExist(data.name);
        if (isExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'name');
        const id = await this._medicineRepository.create(data);
        if (!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return id;
    }
}
