<template>
  <transition name="cookie-bar-transition" appear>
    <div v-if="!cookiesResolved">
      <div class="cookie-bar-container container">
        <div
          id="cookie-bar"
          class="cookie-bar"
          role="alert"
          data-display="flex"
        >
          <div class="cookie-bar__text">
            <h2 class="cookie-bar__title">
              <slot name="title"></slot>
            </h2>
            <p class="no-margin">
              <slot name="text"></slot>
            </p>
          </div>
          <div class="cookie-bar__actions">
            <div class="cookie-bar__buttons">
              <button
                id="cookie-notification__accept"
                class="cookie-bar__button cookie-bar__button--primary"
              >
                Accept
              </button>
              <button
                id="cookie-notification__decline"
                class="cookie-bar__button cookie-bar__button--secondary"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
      <Overlay />
      <DummyNotificationBox />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Overlay from './Overlay.vue'
import DummyNotificationBox from './DummyNotificationBox.vue'

@Component({
  components: {
    Overlay,
    DummyNotificationBox,
  },
})
export default class CookieBar extends Vue {
  $haven: any
  $havenOptions: any
  cookiesResolved = true

  created(): void {
    this.cookiesResolved = this.hasResolvedCookies()
  }

  mounted(): void {
    this.$haven.on('analytics-enabled', this.handleCookies)
    this.$haven.on('analytics-disabled', this.handleCookies)
  }

  hasResolvedCookies(): boolean {
    const key = 'cookies-resolved'
    const cookie = new RegExp(`${key}=(.*?); `, 'gm').exec(
      `${document.cookie}; `
    )
    return cookie !== null
  }

  handleCookies(): void {
    this.cookiesResolved = true
    this.setCookie('cookies-resolved', true, 365)
  }

  setCookie(name: string, value: string | boolean, days?: number): void {
    this.$havenOptions.domains.forEach((domain: string) => {
      let domainAttr = ''
      if (window.location.hostname !== 'localhost') {
        domainAttr = `; domain=${domain}`
      }

      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = `; expires=${date.toUTCString()}`
      }

      document.cookie = `${name}=${
        value || ''
      }${expires}; path=/${domainAttr}; SameSite=Lax`
    })
  }
}
</script>

<style lang="scss" scoped>
$primary-font: 'Poppins' sans-serif;
$secondary-font: 'Open Sans', sans-serif;
$pos: 20px;
$pad: 30px;
$mobilePad: $pad/1.5;
$btn-height: 52px;
$btn-height-sm: 38px;
$primary-color: #00a8f4;
$secondary-color: #acacac;
$black: #000;
$white: #fff;

@mixin mobile-up {
  @media (min-width: 576px) {
    @content;
  }
}

@mixin buttonMixin($borderColor, $textColor, $backgroundColor) {
  color: $textColor;
  border: 2px solid $borderColor;
  background-color: $backgroundColor;

  &.hover,
  &:hover,
  &.focus,
  &:focus,
  &.active,
  &:active {
    color: darken($textColor, 5%);
    background-color: darken($backgroundColor, 5%);
    border-color: darken($borderColor, 5%);
  }

  &.focus,
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba($borderColor, 0.5);
  }
}

.cookie-bar-container {
  position: fixed;
  bottom: $pos;
  left: $pos;
  right: $pos;
  z-index: 2147483647;
  transition: transform 0.2s ease-out;
}

.cookie-bar {
  background: white;
  padding: $mobilePad;
  box-shadow: 0 4px 30px rgba(121, 153, 175, 0.3),
    0 4px 8px rgba(121, 153, 175, 0.15), 0 0 0 1px #dee5ea inset;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include mobile-up {
    flex-direction: row;
    padding: $pad;
  }

  &__text {
    display: flex;
    flex-direction: column;
    margin-bottom: $mobilePad;

    @include mobile-up {
      margin-bottom: 0;
      margin-right: $pad;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;

    @include mobile-up {
      margin-bottom: 0;
    }

    .sa-btn {
      font-size: 14px;
      font-weight: 600;

      @include mobile-up {
        font-size: inherit;
      }
    }

    .sa-btn:first-child {
      margin-right: $mobilePad;
    }
  }

  &__button {
    box-shadow: none;
    cursor: pointer;
    font-family: $secondary-font;
    font-size: 16px;
    font-weight: 600;
    height: $btn-height-sm;
    letter-spacing: 0;
    padding: 0 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    box-shadow: none;
    overflow: hidden;
    position: relative;
    transition: 300ms ease;
    white-space: nowrap;
    z-index: 1;

    &:hover {
      cursor: pointer;
    }

    &--primary {
      @include buttonMixin($primary-color, $white, $primary-color);
      margin-right: $pos;
    }

    &--secondary {
      @include buttonMixin($secondary-color, $white, $secondary-color);
    }
  }

  &__title {
    font-size: 17px;
    font-weight: 700;
    font-family: $primary-font;
    text-align: left;
    padding: 0;
    line-height: 1.2;
    margin: 0 0 $mobilePad/2 0;

    @include mobile-up {
      font-size: 20px;
      margin-bottom: $mobilePad;
    }
  }

  p {
    font-size: 14px;
    text-align: left;
    font-family: $secondary-font;

    @include mobile-up {
      font-size: inherit;
    }
  }

  p.no-margin {
    margin: 0;
    padding: 0;
  }
}

.cookie-bar-transition-enter-active,
.cookie-bar-transition-leave-active {
  transition: opacity 0.5s;
}
.cookie-bar-transition-enter, .cookie-bar-transition-leave-to /* .cookie-bar-transition-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
