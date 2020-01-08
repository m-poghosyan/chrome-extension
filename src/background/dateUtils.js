// TODO replace with moment.js if some more date operations required
export const lessThanSeveralMinutesAgo = (date, minutes = 10) => {
  if (!date) {
    return false;
  }

  const tenMinutes = 1000 * 60 * minutes;
  const tenMinutesAgo = Date.now() - tenMinutes;

  return date > tenMinutesAgo;
};
