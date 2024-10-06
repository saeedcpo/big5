import { Choices, Question, ResultText } from '../types'

const server = process.env.REACT_APP_QUIZ_SERVER_URL || ''

console.log('Server URL:', server)

export function getQuestions(lang: string): Promise<Question[]> {
  console.log('Fetching questions for language:', lang)
  return getData('test', 'questions.json', lang)
}

export function getChoices(lang: string): Promise<Choices> {
  console.log('Fetching choices for language:', lang)
  return getData('test', 'choices.json', lang)
}

export function getResultTexts(lang: string): Promise<ResultText[]> {
  console.log('Fetching result texts for language:', lang)
  return getData('result', 'index.json', lang)
}

const getData = async (
  dir: 'test' | 'result',
  filename: string,
  lang: string
): Promise<any> => {
  const url = `${server}data/${dir}/${lang}/${filename}`
  console.log('Fetching data from URL:', url)
  
  try {
    const response = await fetch(url)
    console.log('Response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const text = await response.text()
    console.log('Raw response:', text)
    
    try {
      const data = JSON.parse(text)
      console.log('Data parsed successfully:', filename)
      return data
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      throw parseError
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
