import { Group, GroupData } from '@src/models/group';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

type CreateGroupControllerRequest = Omit<GroupData, 'user'>;

export class CreateGroupController implements Controller {
    async handle(
        req: Request<CreateGroupControllerRequest>
    ): Promise<Response> {
        const group = new Group({
            ...req.body,
            user: req.userId,
        });

        await group.save();

        return {
            status: 201,
            data: {
                ...group.toJSON(),
            },
        };
    }
}
