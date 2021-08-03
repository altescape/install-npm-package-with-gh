import { shallowMount } from '@vue/test-utils'
import CookieBar from '@/plugins/CookieBar/CookieBar.vue'

let wrapper: any

describe('CookieBar.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(CookieBar)
  })

  it('renders overlay', () => {
    const overlay = wrapper.find('overlay-stub')
    expect(overlay.exists()).toBe(true)
  })

  it('renders dummy notification box', () => {
    const dummynotificationbox = wrapper.find('dummynotificationbox-stub')
    expect(dummynotificationbox.exists()).toBe(true)
  })

  it('renders cookie bar container', () => {
    const cookieBarContainer = wrapper.findAll('div').at(1)
    expect(cookieBarContainer.classes('cookie-bar-container')).toBe(true)

    const cookieBar = cookieBarContainer.findAll('div').at(1)
    // Required id for Haven
    expect(cookieBar.attributes('id')).toBe('cookie-bar')

    const title = cookieBar.find('h2')
    expect(title.classes('cookie-bar__title')).toBe(true)

    const text = cookieBar.find('p')
    expect(text.classes('no-margin')).toBe(true)

    const acceptButton = cookieBar.findAll('button').at(0)
    // Required id for Haven
    expect(acceptButton.attributes('id')).toBe('cookie-notification__accept')

    const declineButton = cookieBar.findAll('button').at(1)
    // Required id for Haven
    expect(declineButton.attributes('id')).toBe('cookie-notification__decline')
  })
})
