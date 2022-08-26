const SECOND = 60;
const MINUTE = 60 * 60;
const DAY = 60 * 60 * 24;
const MONTH = 60 * 60 * 24 * 30;
const YEAR = 60 * 60 * 24 * 365;

export function getRelativeTime(dateString: string) {
  if (!dateString) return '';

  const now = new Date();
  const msDiff = now.getTime() - new Date(dateString).getTime();
  const secDiff = Math.floor(msDiff / 1000);

  if (secDiff < SECOND) return `${secDiff}초 전`;
  if (secDiff < MINUTE) return `${Math.floor(secDiff / SECOND)}분 전`;
  if (secDiff < DAY) return `${Math.floor(secDiff / MINUTE)}시간 전`;
  if (secDiff < MONTH) return `${Math.floor(secDiff / DAY)}일 전`;
  if (secDiff < YEAR) return `${Math.floor(secDiff / MONTH)}달 전`;
  return `${Math.floor(secDiff / YEAR)}년 전`;
}
