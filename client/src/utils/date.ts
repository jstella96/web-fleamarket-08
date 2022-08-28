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

function getTimeWithoutSeconds(date: Date) {
  date.setSeconds(0);
  return Math.round(date.getTime() / (60 * 1000));
}

/**
 * 초를 제외하고 연, 월, 일, 시간, 분이 같은지를 판별한다.
 */
export function isSameMinute(a: string, b: string) {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return getTimeWithoutSeconds(dateA) === getTimeWithoutSeconds(dateB);
}

export const isToday = (dateString: string) =>
  new Date().toDateString() === new Date(dateString).toDateString();

const addLeadingZero = (number: number) => `${number}`.padStart(2, '0');

/**
 * 초를 제외한 시간을 문자열 HH:MM 형태로 반환한다.
 */
export function getTimeString(dateString: string) {
  const date = new Date(dateString);
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

/**
 * 초를 제외한 시간을 문자열 YYYY. MM. DD. HH:MM 형태로 반환한다.
 */
export function getFullTimeString(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNumber = date.getDate();
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  return `${year}. ${month}. ${dateNumber} ${hours}:${minutes}`;
}
