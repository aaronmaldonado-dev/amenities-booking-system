import { deleteOne, getAll, getOne, updateOne } from '../../utils/handlerFactory';
import { User } from '../user/user.model';

export const updateOneUser = updateOne(User);
export const deleteOneUser = deleteOne(User);
export const getAllUsers = getAll(User);
export const getOneUser = getOne(User);
