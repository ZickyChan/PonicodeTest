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
    console.log('Calculating result');
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
        console.log('aaaaaaaa');
        console.log(sequenceStorage);
        console.log(queue);
        o = sequenceStorage.indexOf(queue.toString()); // Check for Cycle offset
        console.log(o);
        sequenceStorage.push(queue.toString()); // Remember current sequence
        groupValue.push(sum); // Found a new group
    } while (o === -1); // Loop until we get a cycle
    // Sum up the first elements occuring just once
    for (var i = 0; i < o; i++) {
        res += groupValue[i];
    }
    // Calculate the rest, which doesn't fit into a group
    var r = (turns - o) % (groupValue.length - o);
    // Run over the other groups
    for (var i = 0; i < groupValue.length; i++) {
        // Group value times the number of occurences plus the rest
        res += groupValue[i] * (Math.floor((turns - o) / (groupValue.length - o)) + (r > 0 ? 1 : 0));
        r--; // Reduce rest
    }
    return res;
}
if (!module.parent) {
    var data = readFile('roller_coaster.hard');
    console.log('Result: ', compute(data.queues, data.size, data.turns));
}
//# sourceMappingURL=solutionWithAlgorithm.js.map