import * as express from 'express'
import * as bodyParser from 'body-parser'
import { CatsService } from './services/CatsService'
import * as cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT: any = process.env.PORT
const app = express()
const catService = new CatsService()

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get('/cats', (req, res, next) => {
  catService.getCats()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
})

// Custom Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something is broken!')
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
