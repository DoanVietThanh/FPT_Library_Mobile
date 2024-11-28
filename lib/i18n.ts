import en from '~/messages/en.json'
import vi from '~/messages/vi.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en,
  vi,
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',

  interpolation: {},
})

export default i18n
