const getData = async (
  dir: 'test' | 'result',
  filename: string,
  lang: string
): Promise<any> => {
  const url = `${server}data/${dir}/${lang}/${filename}`
  const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  console.log('Fetching data from URL:', corsProxyUrl)
  
  try {
    const response = await fetch(corsProxyUrl)
    console.log('Response status:', response.status)
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2))
    
    const text = await response.text()
    console.log('Full raw response:', text)
    console.log('Response length:', text.length)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`)
    }
    
    try {
      const data = JSON.parse(text)
      console.log('Data parsed successfully:', filename)
      return data
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      console.error('Failed JSON string:', text)
      throw parseError
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
