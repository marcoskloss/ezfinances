import { Group } from '@src/models/group';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class ShowGroupController implements Controller {
    async handle(req: Request): Promise<Response> {
        const group = await Group.findOne({ _id: req.params.groupId });
        return {
            data: group?.toJSON(),
        };
    }
}
