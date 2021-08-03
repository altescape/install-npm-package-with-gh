import Vue from 'vue'
import App from './App.vue'
import CookieBar from './plugins/CookieBar'

Vue.config.productionTip = false

Vue.use(CookieBar, {
  havenOptions: {
    domains: ['.swiftaid.co.uk'],
    services: [
      {
        name: 'google-tag-manager',
        purposes: ['analytics'],
        type: 'google-tag-manager',
        inject: true,
        options: {
          id: 'GTM-T4P4NKD',
        },
      },
    ],
  },
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
