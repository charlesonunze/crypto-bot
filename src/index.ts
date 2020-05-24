import program from 'commander';
import BackTester from './tester';

program
  .version('1.0.0')
  .option('-t, --time [time]', 'How much historical data to use', '1m')
  .option('-s, --strategy [strategy]', 'Strategy Type', 'simple')
  .option('-f, --funds [funds]', 'Amount of money to use', parseFloat)
  .option('-l, --live', 'Run live')
  .parse(process.argv);

const main = async function () {
  const { time, strategy } = program;

  const tester = new BackTester({
    strategy,
    startTime: time
  });

  await tester.start();
};

main();
