import Vue from 'vue'
import VueI18n from 'vue-i18n'
import id from '@/locales/id.json'

Vue.use(VueI18n)
const pluralizationRules ={
  /**
   * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
   * @param choicesLength {number} an overall amount of available choices
   * @returns a final choice index to select plural word by
   */
  'id': (choice) =>{
    // this === VueI18n instance, so the locale property also exists here

    if (choice === 0) {
      return 0;
    }else{
      return 1;
    }
  }
}

const dateTimeFormats = {
  'en': {
    short: { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'id': {
    short: { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  }
}

const numberFormats = {
  'en': {
    currency: { 
      style: 'currency',
      currency: 'USD'
    }
  },
  'id': {
    currency: { 
      style: 'currency',
      currency: 'IDR'
    }
  }
}

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { id },
  pluralizationRules,
  dateTimeFormats,
  numberFormats
})
