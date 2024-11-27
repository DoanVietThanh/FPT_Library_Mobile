import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
  vi: {
    translation: {
      'Welcome to React': 'Chào mừng tới react',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',

  interpolation: {},
})

export default i18n
