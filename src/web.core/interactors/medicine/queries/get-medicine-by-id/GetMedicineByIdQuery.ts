import { IQuery } from '../../../../domain/common/interactor/interfaces/IQuery';

export class GetMedicineByIdQuery implements IQuery {
    id: string;
}
