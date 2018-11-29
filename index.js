#!/usr/bin/env node

const split = require('split');
const Queue = require('./queue');
const charm = require('charm')();
const babar = require('babar');


const cli = require('optimist')
    .usage('Plot values from stdin.\nUsage: $0 -w [width] -h [height]')
    .describe('w', 'Width of the chart (in terminal columns)')
    .describe('h', 'Height of the chart (in terminal rows)')
    .default({w: 100, h: 10});

if (cli.argv.help) {
    return cli.showHelp();
}

const count = Math.floor(cli.argv.w / 3);
const width = count * 3;
const height = cli.argv.h;

let first = true;
const queue = new Queue(count);
queue.fill();

function enqueue(line) {
    const value = parseFloat(line);
    if (!isNaN(value)) {
        queue.enqueue(value);
    }
}

function plot() {
    let data = queue.map(function (value, index) {
        return [index + 1, value];
    });
    const max = queue.reduce(function (acc, val) {
        return (val > acc) ? val : acc;
    }, 0);


    const chart = babar(data, {
        color: 'green',
        width: width,
        height: height,
        yFractions: max > 10 ? 0 : 1
    });

    if (!first) charm.up(height + 2);
    first = false;
    console.log('\n' + chart + '\n');

    if (queue.isFull()) {
        queue.clear();
        queue.fill();
    }
}

charm.pipe(process.stdout);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.pipe(split()).on('data', function (buffer) {
    enqueue(buffer.toString());
    plot();
});

process.stdin.on('end', function () {
    process.stdout.write('\n');
});
