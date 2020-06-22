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

if (!module.parent) {
    const data: Input = readFile('roller_coaster.hard');

    let currentTurn = 0;
    let sum = 0;
    let result = 0;
    let count = 0;


    while (currentTurn < data.turns) {
        const currentNode = data.queues[0];
        sum += currentNode;
        count++;
        if (sum <= data.size) {
            data.queues.shift();
            data.queues.push(currentNode);

            if(sum === data.size || count === data.numberOfGroups) {
                result += sum;
                sum = 0;
                currentTurn++;
                count = 0;
            }
            continue;
        }

        result += (sum - currentNode);
        sum = 0;
        count = 0;
        currentTurn++;
    }

    console.log('Dirhams: ', result);
}