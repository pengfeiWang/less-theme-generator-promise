/// <reference path="../typings/tsd.d.ts" />

function isString(obj: any): boolean {
  return typeof obj === 'string';
}

function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

function validate(globalConfig): Array<string> {
  var errors: Array<string> = [];
  var { config, lessFileRegex } = globalConfig
  if (!(isString(config.src) && lessFileRegex.test(config.src))) {
    errors.push('Error: src config property must be a string path locating the LESS file for the bundle');
  }

  if (config.writeFile && !isArray(config.dest)) {
    errors.push('Error: dest config property must be a string or array of strings designating the output LESS file(s).');
  }

  return errors;
}

export = function initialize(cfg): any {
  var obj = {
    config: {
      dest: []
    },
    imports: [],
    writers: [],
    output: [],
    hrefRegex: /href=("[^"]*)/,
    stringLiteralRegex: /.*(?:'|")(.*)(?:'|").*/,
    lessFileRegex: /.less$/, 
    cssFileRegex: /.css$/
  };
  if (!cfg) {
    throw new Error('No config specified');
  }
  obj.config = cfg;
  if (typeof cfg.dest === 'string') {
    obj.config.dest = [cfg.dest];
  }
  obj.config = cfg;
  var errors = validate(obj);
  if (errors.length > 0) {
    errors.forEach((error) => { console.log(error); });
    throw new Error('Invalid config');
  }
  return obj;
}
