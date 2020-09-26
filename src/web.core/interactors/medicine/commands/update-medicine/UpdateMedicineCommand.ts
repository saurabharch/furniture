import { ICommand } from '../../../../domain/common/interactor/interfaces/ICommand';

export class UpdateMedicineCommand implements ICommand {
    id: string;
    name: string;
}
