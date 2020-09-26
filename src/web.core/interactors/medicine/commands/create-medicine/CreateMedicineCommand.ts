import { ICommand } from '../../../../domain/common/interactor/interfaces/ICommand';

export class CreateMedicineCommand implements ICommand {
    name: string;
    price: number
}
