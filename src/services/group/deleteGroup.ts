import { AppError } from '@src/errors/appError';
import { Group } from '@src/models/group';
import { Transaction } from '@src/models/transaction';
import { log } from '@src/util/logger';

export interface DeleteGroupParams {
    groupId: string;
}

export class DeleteGroupService {
    public async exec({ groupId }: DeleteGroupParams): Promise<string> {
        try {
            const hasAssociatedTransactions = await Transaction.count({
                group: groupId,
            });

            if (hasAssociatedTransactions) {
                throw new AppError(
                    'Não é possível deletar um grupo que tenha transações associadas!',
                    400
                );
            }

            await Group.deleteOne({ _id: groupId });
            return groupId;
        } catch (error) {
            if (error instanceof AppError) throw error;

            log.error(error);
            throw new AppError('Erro ao excluir o grupo!', 500);
        }
    }
}
