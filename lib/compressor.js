"use strict";
/// <reference path="../typings/tsd.d.ts" />
var fs = require("fs");
var path = require("path");
var initialize = require("./initialize");
var buildContents = require("./buildcontents");
var generateOutput = require("./generateoutput");
function writeToFile(path, data) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = fs.openSync(path, 'w'), buffer = new Buffer(data.join('\n'), 'utf8');
            fs.writeSync(fd, buffer, 0, buffer.length, 0);
            fs.closeSync(fd);
            resolve();
        }
        catch (err) {
            console.log('Could not write to file: ' + JSON.stringify(err, null, 4));
            reject(err);
        }
    });
}
function compress(config) {
    var globals = initialize(config);
    return new Promise(function (resolve, reject) {
        var src = path.resolve(globals.config.src), writeFile = config && config.writeFile, writers = globals.writers, output = globals.output, dest = globals.config.dest, version = globals.config.version, license = globals.config.license;
        if (writeFile) {
            dest.forEach(function (outFile, index) {
                var end = outFile.lastIndexOf('.');
                dest[index] = outFile.substring(0, (end > -1) ? end : undefined) + '.less';
            });
        }
        try {
            var data = fs.readFileSync(src, 'utf8');
            var splitLines = data.split(/\r\n|\n/);
            splitLines[0] = splitLines[0].trim();
            buildContents(splitLines, src, globals);
            generateOutput(globals);
            if (!!license) {
                var licenseFile = path.resolve(license), licenseData = fs.readFileSync(licenseFile, 'utf8'), lines = licenseData.split(/\r\n|\n/), regex = /(.*)v\d+\.\d+\.\d+(.*)/;
                if (!!version) {
                    lines.some(function (line, index) {
                        if (regex.test(line)) {
                            lines[index] = line.replace(regex, '$1v' + version + '$2');
                            return true;
                        }
                        return false;
                    });
                }
                lines.forEach(function (line, index) {
                    lines[index] = ' * ' + line;
                });
                lines.unshift('/**');
                lines.push(' */');
                output.unshift(lines.join('\n'));
            }
            if (!!output[output.length - 1].trim()) {
                output.push('');
            }
            if (writeFile) {
                dest.forEach(function (destFile) {
                    var destPath = path.resolve(destFile), split = path.resolve(destPath, '..').split(/\/|\\/), concat = '';
                    if (/[a-zA-Z]:/.test(split[0])) {
                        split.shift();
                        split.unshift('/' + split.shift());
                    }
                    split.forEach(function (val) {
                        concat += val + '/';
                        try {
                            fs.mkdirSync(concat);
                        }
                        catch (err) {
                        }
                    });
                    writeToFile(destPath, output)
                        .then(function () { return resolve(output.join('\n')); })["catch"](function (error) { return reject(error); });
                });
            }
            resolve(output.join('\n'));
        }
        catch (err) {
            return reject(err);
        }
    });
}
module.exports = compress;
