export const genRandomString = (length = 6) =>
	Math.random().toString(20).substr(2, 6);
