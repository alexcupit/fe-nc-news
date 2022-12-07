export const dateConversion = (created_at) => {
  const [year, month, day] = created_at
    .substring(0, created_at.indexOf('T'))
    .split('-');

  const time = created_at.substring(
    created_at.indexOf(':') + 1,
    created_at.indexOf(':') + 6
  );

  return { day, month, year, time };
};
