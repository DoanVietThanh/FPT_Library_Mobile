import axios from 'axios'

async function translateText(text: string, targetLang: string = 'vi'): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_TRANSLATE_API_KEY // Thay bằng key của bạn
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

  try {
    const response = await axios.post<{
      data: { translations: { translatedText: string }[] }
    }>(url, {
      q: text,
      target: targetLang,
    })
    return response.data.data.translations[0].translatedText
  } catch (error) {
    console.error('Lỗi dịch:', error)
    return text
  }
}

export default translateText
