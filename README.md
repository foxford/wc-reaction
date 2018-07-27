## Usage

### Define module

#### ES
```html
<script type="module">
  import { ReactionList } from '@netology-group/wc-reaction/es/index.js';
  window.customElements.define('reaction-list', ReactionList);
</script>
```

#### UMD
```html
<script src="path/to/dist/index.js"></script>
<script>window.customElements.define('reaction-list', window.WCReactions.ReactionList);</script>
```

### In HTML

### Generic usage
```html
<reaction-list></reaction-list>
```

## How to

### Demo
```sh
npm start
```

### Run for development
```sh
npm run build -- --w
```

### Build for production
```sh
NODE_ENV=production npm run build
```

