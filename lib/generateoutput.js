"use strict";
function removeEmptyStringsFromEnd(output) {
    while (!output[output.length - 1]) {
        output.pop();
    }
}
function generateOutput(globals) {
    var writers = globals.writers, previousLine = '';
    var output = globals.output;
    writers.forEach(function (writer) {
        previousLine = writer.write(output, previousLine);
    });
    removeEmptyStringsFromEnd(output);
}
module.exports = generateOutput;
