import { profileRepository } from "@/prisma/repositories/profile.repository";
async function handleReadById(data) {
  return await profileRepository.findUnique(data);
}
export {
  handleReadById
};
