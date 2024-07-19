export function formatDate(date: string) {
  const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  } as Intl.DateTimeFormatOptions;
  return String(new Date(date).toLocaleDateString('en-US', options).split(','));
}
