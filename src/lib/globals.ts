/// <reference path="../typings/tsd.d.ts" />

import Writer = require('./writer');
import path = require('path');

export interface IConfig {
  src: string;
  dest?: Array<string>;
  writeFile?: boolean;
  version?: string;
  license?: string;
}

export interface IObject<T> {
  [x: string]: T;
}

function isString(obj: any): boolean {
  return typeof obj === 'string';
}

function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

export function validate(globalConfig): Array<string> {
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
export var obj = {
  config: {},
  writers: [],
  output: [],
  hrefRegex: /href=("[^"]*)/,
  stringLiteralRegex: /.*(?:'|")(.*)(?:'|").*/,
  lessFileRegex: /.less$/, 
  cssFileRegex: /.css$/
};
export var config: IConfig;
