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
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2))
    
    const text = await response.text()
    console.log('Raw response (first 200 characters):', text.substring(0, 200))
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${text.substring(0, 200)}`)
    }
    
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
