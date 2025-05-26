export function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
export function daysRemaining(date, now = new Date()) {
  if (!date) return null;
  const diff = new Date(date).getTime() - now.getTime();
  return Math.ceil(diff / (1000*60*60*24));
}
export function returnDateClass(days) {
  if (days === null) return '';
  if (days < 0 || days <= 3) return 'urgent';
  if (days <= 7) return 'close';
  return 'normal';
}

