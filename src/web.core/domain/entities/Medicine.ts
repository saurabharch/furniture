import { BaseEntity } from './base/BaseEntity';
import { IMedicine } from '../types/IMedicine';
import { MessageError } from '../common/exceptions/message/MessageError';
import { SystemError } from '../common/exceptions/SystemError';

export class Medicine extends BaseEntity<IMedicine> implements IMedicine {
    constructor(data?: IMedicine) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }

    get name(): string {
        return this.data.name;
    }

    set name(val: string) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'name');
        if (val.length > 50)
            throw new SystemError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'name', 50);

        this.data.name = val;
    }

    get price(): number {
        return this.data.price;
    }

    set price(val: number) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'price');
        this.data.price = val;
    }
}
