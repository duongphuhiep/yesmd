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

#### Other method to re-Format all the codes

Install `prettier`

```bash
pnpm i -g prettier
```

Reformat all the source

```bash
prettier --write src/* src/**/* tests/* tests/**/*
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
