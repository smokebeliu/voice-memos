import {useState} from "react"
import {speechService} from "services"

export const useSpeechRecognition = () => {
  const [isSpeech, setIsSpeech] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [error, setError] = useState('')

  const toggleSpeechRecognition = async () => {
    if (isSpeech) {
      speechService.stop()
      setIsSpeech(false)
      return
    }
    setIsSpeech(true)
    setError('')
    try {
      const res = await speechService.getSpeech()
      setRecognizedText(res)
    } catch (error) {
      setError(error as string)
    }
    setIsSpeech(false)
  }

  return {isEnable: speechService.isEnable, isSpeech, toggleSpeechRecognition, recognizedText, error}
}