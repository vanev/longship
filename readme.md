# Longship

A briny theme for seafaring souls.

## Developing

First, ensure that you have a `config.yml` at the root. It should look something like:

```
development:
  password: a_password
  theme_id: "some_id"
  store: dev-store.myshopify.com
  ignore_files:
    - "*.scss"
    - "*.ts"
```

Next, run:

```
yarn dev
```

This will run three watchers:

- The **theme** watcher will watch all of theme files—those not ignored by the `config.yml`—for changes. When they change, they will be uploaded to the development store for you to preview. [Read more about the Shopify Theme Kit](https://shopify.dev/tools/theme-kit).

- The **sass** watcher will watch all of the stylesheets—written in SCSS—for changes. When they change, the `assets/application.css.liquid` file is updated—which is then uploaded by the theme watcher. [Read more about SCSS](https://sass-lang.com/).

- The **scripts** watcher will watch all of the scripts—written in Typescript—for changes. When they change, the `assets/application.js` and `assets/application.js.map` files is updated—which is then uploaded by the theme watcher. [Read more about Typescript](https://www.typescriptlang.org/).
