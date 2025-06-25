
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next)
  .init({
    resources: {
      'en': {
        translation: {
          'dialog.action.cancel': 'Cancel',
          'dialog.action.confirm': 'Confirm',
        },
      },
      'zh-CN': {
        translation: {
          'dialog.action.cancel': '取消',
          'dialog.action.confirm': '确定',
        },
      },
      'zh-TW': {
        translation: {
          'dialog.action.cancel': '取消',
          'dialog.action.confirm': '確定',
        },
      }
    },
    lng: 'zh-TW',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })