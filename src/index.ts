import HistoricalService from './services/historical';

const main = async function () {
	const data = await HistoricalService.getData();
	console.log(data);
};

main();
