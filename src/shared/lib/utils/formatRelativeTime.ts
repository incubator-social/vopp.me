export function formatRelativeTime(date: string | number | Date) {
  const createdAt = new Date(date);
  const diffMs = Date.now() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffMinutes < 60) {
    return rtf.format(-diffMinutes, 'minute');
  }
  if (diffMinutes < 60 * 24) {
    return rtf.format(-Math.floor(diffMinutes / 60), 'hour');
  }
  return rtf.format(-Math.floor(diffMinutes / (60 * 24)), 'day');
}
