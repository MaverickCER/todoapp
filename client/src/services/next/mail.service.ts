import { logger } from '@/utils';

export async function sendMail(formData) {
  return logger.errorHandler(
    'sendMail',
    async (formData) => {
      await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      return true;
    },
    formData,
    false,
  );
}
