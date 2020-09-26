import { ICommand } from '../../../../domain/common/interactor/interfaces/ICommand';

export class DeleteMedicineCommand implements ICommand {
    id: string;
}
