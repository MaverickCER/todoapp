import { profileRepository } from '@/prisma/repositories/profile.repository';
import { Profile } from '@prisma/client';

async function handleReadById(data: { id: number }): Promise<Profile | null> {
  return await profileRepository.findUnique(data);
}

export { handleReadById };
