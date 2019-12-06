#Less Bundle Promise (multi-less-bundle-promise)

```javascript
var path = require('path');
var bundle = require('less-bundle-promise');
const themes = [ 'green.less', 'blue.less', 'yellow.less' ];

themes.map(file => {
  bundle({
    src: path.join(cwd, file)
  }).then(output =>{
    // do something with output less
    // less.render(output)
  }).catch(error => {
    console.log('Error', error);
  });
})
bundle({
  src: 'main.less'
}).then(output =>{
  // do something with output less
  // less.render(output)
}).catch(error => {
  console.log('Error', error);
});

```


