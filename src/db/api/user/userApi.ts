import { User } from '../../interfaces';
import { UserModel } from '../../models/user/User';

const userApi = {
  async findUser(userId: string): Promise<User | null> {
    return (await UserModel.findOne({ userId })).toJSON();
  },

  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  },
};

export default userApi;

export type UserApi = typeof userApi;
