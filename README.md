# yesmd

Work in progress..

## Project setup

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
pnpm run serve
```

### Compiles and minifies for production

```bash
pnpm run build
```

### Run your unit tests

#### Run all unit tests

```bash
pnpm run test:unit
```
or
```bash
npx jest
```

#### Run one individual unit test

```bash
npx jest tests/unit/dagre_sample.spec.ts
```

#### Watch unit test(s)

just add the `--watch` option, for eg:

```bash
npx jest tests/unit/dagre_sample.spec.ts --watch
```

### Lints and fixes files

```bash
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Brain storming

https://github.com/pouchdb/pouchdb - database sync couchdb
https://github.com/dagrejs/dagre/wiki - layout graph wiring
http://fabricjs.com/ - draw graph

```js
Kind {
    id
    string name //Unique,
    bool isLink
    List<KV> properties,
    string sampleData,
    string comment
}

Relation {
    id
    type: Normal (1-N)/ Reference (0-N) / Unique (1-1) / UniqueOptional (0-1) / Extension 
    Kind parent
    Kind child
    //Unique(type, parent, child)
}

View {
    [{
        Kind
        rect //size position
    }]
}
```