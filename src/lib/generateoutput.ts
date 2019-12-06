
function removeEmptyStringsFromEnd(output: Array<string>) {
  while (!output[output.length - 1]) {
    output.pop();
  }
}
function generateOutput(globals: { writers: any; output: any; }) {
  var writers = globals.writers,
    previousLine = '';
  var output = globals.output;
  writers.forEach((writer: { write: (arg0: any, arg1: string) => string; }) => {
    previousLine = writer.write(output, previousLine);
  });

  removeEmptyStringsFromEnd(output);
}

export = generateOutput;
