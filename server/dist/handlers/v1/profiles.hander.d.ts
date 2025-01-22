import { Profile } from '@prisma/client';

declare function handleReadById(data: {
    id: number;
}): Promise<Profile | null>;

export { handleReadById };
