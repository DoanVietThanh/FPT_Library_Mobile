import React, { useRef } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native'
import { Input } from '~/components/ui/input'

type Props = {
  otp: string[]
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
}

const OTPInput = ({ otp, setOtp }: Props) => {
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    // Focus next input
    if (text !== '') {
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  return (
    <View className="w-[80%] max-w-[300px] flex-row justify-between">
      {otp.map((digit, index) => (
        <Input
          key={index}
          className="h-[50px] w-[40px] border-2 text-center text-2xl focus:text-primary"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </View>
  )
}

export default OTPInput
