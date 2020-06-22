"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(fileName) {
    var data = fs.readFileSync(fileName, { encoding: 'utf-8' }).toString();
    var result = {
        size: 0,
        turns: 0,
        numberOfGroups: 0,
        queues: []
    };
    var isInitialize = true;
    data.split('\n').forEach(function (line) {
        if (isInitialize) {
            var _a = line.split(' '), size = _a[0], turns = _a[1], numberOfGroups = _a[2];
            result.size = parseInt(size);
            result.turns = parseInt(turns);
            result.numberOfGroups = parseInt(numberOfGroups);
            isInitialize = false;
            return;
        }
        if (!line) {
            return;
        }
        result.queues.push(parseInt(line));
    });
    return result;
}
if (!module.parent) {
    var data = readFile('roller_coaster.hard');
    var currentTurn = 0;
    var sum = 0;
    var result = 0;
    var count = 0;
    while (currentTurn < data.turns) {
        var currentNode = data.queues[0];
        sum += currentNode;
        count++;
        if (sum <= data.size) {
            data.queues.shift();
            data.queues.push(currentNode);
            if (sum === data.size || count === data.numberOfGroups) {
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
//# sourceMappingURL=InitialSolution.js.map