export const getOrigin = (req) => {
  let origin
  if (typeof window !== 'undefined') {
    origin = window.location.origin
  }
  if (req) {
    let hostURL = req.headers['host']
    if (hostURL) {
      hostURL = hostURL.replace('http://', '')
      hostURL = hostURL.replace('https://', '')
      if (hostURL.includes('localhost:') || hostURL.includes('127.0.0.1')) {
        origin = `http://${hostURL}`
      } else {
        origin = `https://${hostURL}`
      }
    }
  }
  return origin
}
