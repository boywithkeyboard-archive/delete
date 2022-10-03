## @unvented/delete

### Installation

```bash
npm i @unvented/delete
```

### Usage

**Delete a directory.**

```bash
delete dist
```

```js
import { deleteFiles } from '@unvented/delete'

await deleteFiles('./dist')
```

**Delete a file.**

```bash
delete dist/index.js
```

```js
import { deleteFiles } from '@unvented/delete'

await deleteFiles('./dist/index.js')
```

**Delete multiple files and directories.**

```bash
delete a/foo.js a/bar.js b c/foo.cjs d/bar.txt
```

```js
import { deleteFiles } from '@unvented/delete'

await deleteFiles('./a/foo.js', './a/bar.js', './b', './c/foo.js', './d/bar.txt')
```
