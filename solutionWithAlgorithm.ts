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
    }

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
    console.log('Calculating result');
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

        console.log('aaaaaaaa');
        console.log(sequenceStorage);
        console.log(queue);


        o = sequenceStorage.indexOf(queue.toString()); // Check for Cycle offset
        console.log(o);
        sequenceStorage.push(queue.toString()); // Remember current sequence

        groupValue.push(sum); // Found a new group

    } while (o === -1); // Loop until we get a cycle

    // Sum up the first elements occuring just once
    for (let i = 0; i < o; i++) {
        res+= groupValue[i];
    }

    // Calculate the rest, which doesn't fit into a group
    let r = (turns - o) % (groupValue.length - o);

    // Run over the other groups
    for (let i = 0; i < groupValue.length; i++) {

        // Group value times the number of occurences plus the rest
        res+= groupValue[i] * (Math.floor((turns - o) / (groupValue.length - o)) + (r > 0 ? 1 : 0));
        r--; // Reduce rest
    }
    return res;
}


if (!module.parent) {
    const data: Input = readFile('roller_coaster.hard');

    console.log('Result: ', compute(data.queues, data.size, data.turns));
}