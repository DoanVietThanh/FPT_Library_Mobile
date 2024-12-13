/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionError } from '~/types/action-response'
import i18n from 'i18next'
import { Control, UseFormSetFocus } from 'react-hook-form'
import Toast from 'react-native-toast-message'

function handleActionError(
  error: ActionError,
  control?: Control<any, any>,
  setFocus?: UseFormSetFocus<any>,
) {
  if (error.typeError === 'error' || error.typeError === 'warning') {
    Toast.show({
      type: 'error', // Define your custom type
      text1: i18n.language === 'vi' ? 'Lỗi' : 'Error',
      text2: error.messageError,
    })

    return
  }

  if (error.typeError === 'unknown') {
    Toast.show({
      type: 'error', // Define your custom type
      text1: i18n.language === 'vi' ? 'Lỗi' : 'Error',
      text2:
        i18n.language === 'vi'
          ? 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.'
          : 'An unknown error occurred. Please try again later.',
    })

    return
  }

  if (!control || !setFocus) return

  const keys = Object.keys(error.fieldErrors)
  keys.forEach((key) => control.setError(key, { message: error.fieldErrors[key][0] }))
  setFocus(keys[0])
}

export default handleActionError
