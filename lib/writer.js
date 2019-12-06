"use strict";
var Writer = /** @class */ (function () {
    function Writer(operator) {
        if (Array.isArray(operator)) {
            this.__lines = operator;
            return;
        }
    }
    Writer.prototype.write = function (output, previousLine) {
        var trim;
        this.__lines.forEach(function (line) {
            trim = line.trim();
            if (!previousLine && !trim) {
                return;
            }
            output.push(line);
            previousLine = trim;
        });
        return previousLine;
    };
    return Writer;
}());
module.exports = Writer;
