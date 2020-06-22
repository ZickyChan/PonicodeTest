import * as fs from 'fs';

interface Input {
    size: number;
    turns: number;
    numberOfGroups: number;
    queues: number[];
}

function readFile(fileName): Input {
    const data = fs.readFileSync(fileName, { encoding: 'utf-8' }).toString();
    const result: Input = {
        size: 0,
        turns: 0,
        numberOfGroups: 0,
        queues: []
    };

    let isInitialize = true;
    data.split('\n').forEach((line) => {
        if (isInitialize) {
            const [size, turns, numberOfGroups] = line.split(' ');
            result.size = parseInt(size);
            result.turns = parseInt(turns);
            result.numberOfGroups = parseInt(numberOfGroups);
            isInitialize = false;
            return;
        }
        if(!line) {
            return;
        }

        result.queues.push(parseInt(line));
    });

    return result;
}

function compute(queue: number[], size: number, turns: number): number {
    let groupValue = [];
    let sequenceStorage = [queue.toString()];
    let onboardGroup = queue.shift();

    let o; // Cycle offset

    let res = 0; // Final result

    // Calculate offset and groups
    do {

        let sum = 0;

        // Generate a group
        for (let i = 0; i <= queue.length && sum + onboardGroup <= size; i++) {
            queue.push(onboardGroup); // Push current value to back
            sum+= onboardGroup; // Sum for group
            onboardGroup = queue.shift(); // Pop a new value from the front
        }

        o = sequenceStorage.indexOf(queue.toString()); // Check for Cycle offset
        sequenceStorage.push(queue.toString()); // Remember current sequence

        groupValue.push(sum); // Found a new group

    } while (o === -1); // Loop until we get a cycle

    // Sum up the first elements occuring just once
    for (let i = 0; i < o; i++) {
        res+= groupValue.shift();
        turns--;
    }

    let remaining = turns % groupValue.length;

    let index = 0;
    while (remaining > 0) {
        res += groupValue[index];
        index++;
        remaining--;
        turns--;
    }

    const sumGroup = groupValue.reduce((acc, value) => {
        return acc + value;
    });

    res += sumGroup*(turns/groupValue.length);

    return res;
}


if (!module.parent) {
    const dataHard: Input = readFile('roller_coaster.hard');

    console.log('Result hard: ', compute(dataHard.queues, dataHard.size, dataHard.turns));

    const dataHarder: Input = readFile('roller_coaster.harder');

    console.log('Result harder: ', compute(dataHarder.queues, dataHarder.size, dataHarder.turns));
}