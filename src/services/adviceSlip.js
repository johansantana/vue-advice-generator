// get advice from API
export async function fetchAdvice() {
  const data = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .catch(err => console.error(err))
  return data
}
