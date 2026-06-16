#!/usr/bin/env node
import { Command } from 'commander';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('ecofolio')
  .description('Portfolio studio for students and creatives')
  .version('0.1.0');

program
  .command('dev')
  .description('Start the development server')
  .option('-p, --port <port>', 'Port to run the server on', '3000')
  .action(devCommand);

program
  .command('build')
  .description('Build the static site')
  .action(buildCommand);

program
  .command('init')
  .description('Initialize a new portfolio')
  .argument('[directory]', 'Directory to create the portfolio in')
  .action(initCommand);

program.parse();
