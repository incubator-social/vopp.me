export function formatRelativeTime(date: string | number | Date) {
  if (!date) return '';
  const createdAt = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }

  if (diffDays < 7) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  }

  // если больше недели, но меньше года → "Jul 3"
  if (diffDays < 365) {
    return createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  // если больше года → "Jul 3, 2021"
  return createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
