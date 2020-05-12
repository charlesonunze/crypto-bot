import BackTester from './tester';

const main = async function () {
	const tester = new BackTester();
	await tester.start();
};

main();
