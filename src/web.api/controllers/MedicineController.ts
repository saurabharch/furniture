import { Authorized, Body, Delete, Get, JsonController, Param, Params, Post, Put, QueryParams } from 'routing-controllers';
import { CreateMedicineCommand } from '../../web.core/interactors/medicine/commands/create-medicine/CreateMedicineCommand';
import { CreateMedicineCommandHandler } from '../../web.core/interactors/medicine/commands/create-medicine/CreateMedicineCommandHandler';
import { DeleteMedicineCommand } from '../../web.core/interactors/medicine/commands/delete-medicine/DeleteMedicineCommand';
import { DeleteMedicineCommandHandler } from '../../web.core/interactors/medicine/commands/delete-medicine/DeleteMedicineCommandHandler';
import { FindMedicineQuery } from '../../web.core/interactors/medicine/queries/find-medicine/FindMedicineQuery';
import { FindMedicineQueryHandler } from '../../web.core/interactors/medicine/queries/find-medicine/FindMedicineQueryHandler';
import { FindMedicineResult } from '../../web.core/interactors/medicine/queries/find-medicine/FindMedicineResult';
import { GetMedicineByIdQuery } from '../../web.core/interactors/medicine/queries/get-medicine-by-id/GetMedicineByIdQuery';
import { GetMedicineByIdQueryHandler } from '../../web.core/interactors/medicine/queries/get-medicine-by-id/GetMedicineByIdQueryHandler';
import { GetMedicineByIdResult } from '../../web.core/interactors/medicine/queries/get-medicine-by-id/GetMedicineByIdResult';
import { PaginationResult } from '../../web.core/domain/common/interactor/PaginationResult';
import { Service } from 'typedi';
import { UpdateMedicineCommand } from '../../web.core/interactors/medicine/commands/update-medicine/UpdateMedicineCommand';
import { UpdateMedicineCommandHandler } from '../../web.core/interactors/medicine/commands/update-medicine/UpdateMedicineCommandHandler';

@Service()
@JsonController('/medicines')
export class MedicineController {
    constructor(
        private readonly _findMedicineQueryHandler: FindMedicineQueryHandler,
        private readonly _getMedicineByIdQueryHandler: GetMedicineByIdQueryHandler,
        private readonly _createMedicineCommandHandler: CreateMedicineCommandHandler,
        private readonly _updateMedicineCommandHandler: UpdateMedicineCommandHandler,
        private readonly _deleteMedicineCommandHandler: DeleteMedicineCommandHandler
    ) { }

    @Get('/')
    async find(@QueryParams() param: FindMedicineQuery): Promise<PaginationResult<FindMedicineResult>> {
        return await this._findMedicineQueryHandler.handle(param);
    }

    @Get('/:id')
    async getById(@Params() param: GetMedicineByIdQuery): Promise<GetMedicineByIdResult> {
        return await this._getMedicineByIdQueryHandler.handle(param);
    }

    @Post('/')
    @Authorized()
    async create(@Body() param: CreateMedicineCommand): Promise<string> {
        return await this._createMedicineCommandHandler.handle(param);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() param: UpdateMedicineCommand): Promise<boolean> {
        param.id = id;
        return await this._updateMedicineCommandHandler.handle(param);
    }

    @Delete('/:id')
    async delete(@Params() param: DeleteMedicineCommand): Promise<boolean> {
        return await this._deleteMedicineCommandHandler.handle(param);
    }
}
