import { Controller } from '@src/controllers/contract';
import { Group } from '@src/models/group';
import { Request, Response } from '@src/util/http';

export class ListGroupsController implements Controller {
    async handle(req: Request): Promise<Response> {
        const groups = await Group.find({ user: req.userId });
        return {
            data: groups.map((item) => item.toJSON()),
        };
    }
}
