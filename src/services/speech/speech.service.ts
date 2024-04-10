type TErrorMap = {
  [id: string]: string
}

const errorMessageMap: TErrorMap = {
  'not-allowed': 'Voice input not allowed, please grant permissions',
  'no-speech': 'No speech detected, please say something',
  'language-not-supported': 'Unfortunately, your language not supported'
}

class SpeechService {
  speech: SpeechRecognition | null = null
  isEnable = !!(window.SpeechRecognition || window.webkitSpeechRecognition)

  constructor() {
  }

  getSpeech = () => new Promise<string>((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.speech = new SpeechRecognition()
    this.speech.interimResults = false
    this.speech.maxAlternatives = 1
    this.speech.start()
    this.speech.onerror = (event) => {
      const errorText = errorMessageMap[event.error] || 'Something went wrong'
      reject(errorText)
    }
    this.speech.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1]
      resolve(lastResult[0].transcript.trim())
    }
    this.speech.onend = () => {
      resolve('')
    }
  })

  stop = () => {
    this.speech?.stop()
  }
}

export const speechService = new SpeechService()