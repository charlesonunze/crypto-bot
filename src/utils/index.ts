export const genRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export const toMilliSeconds = (time: string) => {
  const _time = time.split('');
  const str = _time.pop();
  const num = parseInt(_time.join(''));

  if (isNaN(num)) {
    throw new Error('Enter a valid format');
  }

  switch (str) {
    case 'd':
      return num * 86400000;

    case 'm':
      return num * 2592000000;

    case 'y':
      return num * 31536000000;
  }
};
