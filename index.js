const express = require('express')
const pad11y = require('pa11y')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/test', async (req, res) => {
    if (!req.query.url) {
        res.status(400).json({error: 'URL is required'})
    } else {
        const results = await pad11y(req.query.url)
        res.status(200).json(results)
    }
})

app.listen(PORT, () =>console.log(`Server started on port ${PORT}`))