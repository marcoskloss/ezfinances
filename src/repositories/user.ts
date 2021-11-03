import { AppError } from '@src/errors/appError';
import { InternalError } from '@src/errors/internalError';
import { User, UserData, UserModel } from '@src/models/user';
import { log } from '@src/util/logger';

export class UserRepository {
    constructor(public readonly model: typeof User = User) {}
    async insert(data: UserData): Promise<UserModel | undefined> {
        try {
            const user = new this.model({ ...data });

            if (!user.isNew) {
                throw new AppError('Usuário já cadastrado!', 409);
            }

            return user.save();
        } catch (error) {
            if (error instanceof AppError) throw error;
            log.error(error);
            throw new InternalError('Erro ao salvar o usuário!');
        }
    }
}
