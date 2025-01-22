import { TTask } from '../../libs/zod/types/task.type.js';
import { GetBatchResult } from '@prisma/client/runtime/library';
import 'zod';
import '../../libs/zod/schemas/task.schema.js';

declare function handleCreate(data: Partial<TTask>): Promise<TTask>;
declare function handleRead(data: Partial<TTask>): Promise<TTask[]>;
declare function handleUpdate(where: {
    id: number;
    profileId: number;
}, data: Partial<TTask>): Promise<TTask>;
declare function handleRemove(where: {
    id: number;
    profileId: number;
}): Promise<GetBatchResult>;

export { handleCreate, handleRead, handleRemove, handleUpdate };
