#Less Bundle Promise (multi-less-bundle-promise)

```javascript
var bundle = require('less-bundle-promise');

bundle({
  src: 'main.less'
}).then(output =>{
  // do something with output less
}).catch(error => {
  console.log('Error', error);
});

// Or write to a file
bundle({
  src: 'main.less',
  dest: 'bundle.less',
  writeFile: true
}).then(output =>{
  // do something with output less
}).catch(error => {
  console.log('Error', error);
});

```

## Options

```typescript
interface IConfig {
  src: string;
  dest: Array<string>;
  writeFile?: boolean;
  version?: string;
  license?: string;
}
```

