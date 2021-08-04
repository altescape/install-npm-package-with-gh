# Vue-Cookie-Bar-Plugin

![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Usage

#### Install

`WIP`

#### Quickstart

Add to your app main js or ts file:

```js
import CookieBar from '@altescape/vue-cookie-bar-plugin'

Vue.use(CookieBar, {
  havenOptions: {
    domains: ['.example.com'],
    services: [
      {
        name: 'google-tag-manager',
        purposes: ['analytics'],
        type: 'google-tag-manager',
        inject: true,
        options: {
          id: 'GTM-T4P1234',
        },
      },
    ],
  },
})
```

Then place the following in a single main Vue file such as `App.vue`:

```html
<CookieBar>
  <template v-slot:title>🍪 Can we use optional cookies?</template>
  <template v-slot:text>
    These cookies help us keep our website safe and give you a better
    experience. We won’t turn them on unless you accept. Want to know more
    or adjust your preferences? Here's our
    <a href="https://www.example.co.uk/legal/cookies/">cookie policy</a>
  </template>
</CookieBar>
```

## Haven

#### The global $haven object

The plugin uses and exposes [Haven](https://chiiya.github.io/haven/) as `$haven`. A list of options to inject into `havenOptions` when initialising the plugin can be found [here](https://chiiya.github.io/haven/getting-started.html#usage).

#### Updating cookie preferences

__Note:__ The plugin was _only_ intended to show the cookie notification (and capture the preferences), but it can also display cookie preferences that allow updates to cookie consent (such as on a cookies policy page) where consent can be updated.

You can add this functionality easily by adding `<div id="cookie-preferences"></div>` anywhere on a page or in a component. See [here](https://chiiya.github.io/haven/cookie-preferences.html#options) for a list of available options.
