export default function error(req, res) {
  res.status(500)
  res.json({ message: 'This is a test error' })
}
