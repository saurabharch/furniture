import { BASE_SCHEMA } from './base/BaseSchema';

export const MEDICINE_SCHEMA = {
    TABLE_NAME: 'medicine',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        NAME: 'name',
        PRICE: 'price'
    },
    RELATED_ONE: {

    },
    RELATED_MANY: {

    }
};
