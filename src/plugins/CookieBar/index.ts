import Haven from '@chiiya/haven'
import { HavenOptions } from '@chiiya/haven/dist/types'
import _Vue from 'vue'
import CookieBar from './CookieBar.vue'

export interface CookieBarOptions {
  havenOptions: HavenOptions
}

const optionsDefaults = {
  havenOptions: {},
}

const CookieBarWrapper = {
  install(Vue: typeof _Vue, opts: CookieBarOptions): void {
    Vue.component('CookieBar', CookieBar)

    const options = { ...optionsDefaults, ...opts }

    Haven.create(options.havenOptions)

    Vue.prototype.$haven = Haven
    Vue.prototype.$havenOptions = options.havenOptions
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CookieBarWrapper)
}

export default CookieBarWrapper
