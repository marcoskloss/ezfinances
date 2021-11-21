import { Group, GroupData } from '@src/models/group';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

interface UpdateGroupControllerRequest extends Partial<GroupData> {
    id?: string;
}

export class UpdateGroupController implements Controller {
    async handle(
        req: Request<UpdateGroupControllerRequest>
    ): Promise<Response> {
        const where = {
            user: req.userId,
            _id: req.params.groupId,
        };

        await Group.updateOne(where, req.body);
        return { status: 200 };
    }
}
