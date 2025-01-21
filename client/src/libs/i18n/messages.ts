export async function getMessages({ locale }: { locale: string }) {
  const messages = await import(`../../messages/${locale}.json`);
  return messages.default;
}
