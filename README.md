# eslint-plugin-vue-guide

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-guide`:

```
$ npm install eslint-plugin-vue-guide --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-vue-guide` globally.

## Usage

Add `vue-guide` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "vue-guide"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vue-guide/rule-name": 2
    }
}
```

## Supported Rules

* [max-attrs-in-line](./docs/rules/zh-cn/max-attrs-in-line.md)

* [self-closing-tag](./docs/rules/zh-cn/self-closing-tag.md)

* [sort-attrs](./docs/rules/zh-cn/sort-attrs.md)

* [sort-keys](./docs/rules/zh-cn/sort-keys.md)
