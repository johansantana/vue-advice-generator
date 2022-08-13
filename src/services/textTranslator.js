export async function translateText(text) {
  const API = import.meta.env.VITE_API_URL

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: `[{"Text": "${text?.replace(/"/g, '\\"')}"}]`
  }

  const data = await fetch(API, options)
    .then(response => response.json())
    .catch(err => console.error(err))
  return data[0].translations[0].text
}
