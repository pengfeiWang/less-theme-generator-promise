class Writer {
  private __lines: Array<string>;
  constructor(lines: Array<string>);
  constructor(operator) {
    if (Array.isArray(operator)) {
      this.__lines = operator;
      return;
    }
  }

  write(output: Array<string>, previousLine: string) {
    var trim: string;
    this.__lines.forEach((line) => {
      trim = line.trim();
      if (!previousLine && !trim) {
        return;
      }
      output.push(line);
      previousLine = trim;
    });
    return previousLine;
  }
}

export = Writer;
