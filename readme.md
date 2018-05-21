这是一个左滑删除的组件,用到了`pull-element`
## 使用 npm 下载

```shell
npm install --save pull-element
```
## 使用方式
在需要删除的dom结构最外层套上`SwipeToShowAction`这个组件，需要传进去的prop传进去即可

```javascript
// ES2015
import PullElement from 'pull-element'

// commonjs
var PullElement = require('pull-element')
```

## 用法

### new PullElement(options)

PullElement 是一个构造函数，接受一个 options 配置项参数，使用 new 关键字进行实例化。

实例化后，调用 init 方法进行初始化。

```javascript
var pullElement = new PullElement(options)
pullElement.init()

```
由于是手动配置的webpack，每次`npm start`后运行webpack打包，在build下面生成打包js文件，必须运行build下面的index.html才可以在浏览器访问到此组件的效果
