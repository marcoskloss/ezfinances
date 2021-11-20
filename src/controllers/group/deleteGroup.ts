import { DeleteGroupService } from '@src/services/group/deleteGroup';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class DeleteGroupController implements Controller {
    async handle(req: Request): Promise<Response> {
        const deleteGroupService = new DeleteGroupService();
        const id = await deleteGroupService.exec({
            groupId: req.params.groupId,
        });
        return {
            data: { id },
        };
    }
}
