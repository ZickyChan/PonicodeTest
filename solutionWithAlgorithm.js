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
function compute(queue, size, turns) {
    var groupValue = [];
    var sequenceStorage = [queue.toString()];
    var onboardGroup = queue.shift();
    var o; // Cycle offset
    var res = 0; // Final result
    // Calculate offset and groups
    do {
        var sum = 0;
        // Generate a group
        for (var i = 0; i <= queue.length && sum + onboardGroup <= size; i++) {
            queue.push(onboardGroup); // Push current value to back
            sum += onboardGroup; // Sum for group
            onboardGroup = queue.shift(); // Pop a new value from the front
        }
        o = sequenceStorage.indexOf(queue.toString()); // Check for Cycle offset
        sequenceStorage.push(queue.toString()); // Remember current sequence
        groupValue.push(sum); // Found a new group
    } while (o === -1); // Loop until we get a cycle
    // Sum up the first elements occuring just once
    for (var i = 0; i < o; i++) {
        res += groupValue.shift();
        turns--;
    }
    var remaining = turns % groupValue.length;
    var index = 0;
    while (remaining > 0) {
        res += groupValue[index];
        index++;
        remaining--;
        turns--;
    }
    var sumGroup = groupValue.reduce(function (acc, value) {
        return acc + value;
    });
    res += sumGroup * (turns / groupValue.length);
    return res;
}
if (!module.parent) {
    var dataHard = readFile('roller_coaster.hard');
    console.log('Result hard: ', compute(dataHard.queues, dataHard.size, dataHard.turns));
    var dataHarder = readFile('roller_coaster.harder');
    console.log('Result harder: ', compute(dataHarder.queues, dataHarder.size, dataHarder.turns));
}
//# sourceMappingURL=solutionWithAlgorithm.js.map