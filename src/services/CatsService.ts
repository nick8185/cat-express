import axios from 'axios'
import { CatObject } from '../interfaces/ICatObject'
import { Cat } from '../interfaces/ICat'
import * as dotenv from 'dotenv'

dotenv.config()

const catUrl: any = process.env.CATURL
const apiKey: any = process.env.APIKEY
const headers = {
  headers: {
    Accept: 'application/json',
    'x-api-key': apiKey ?? ''
  }
}

export class CatsService {
  getCats = async (): Promise<Cat[]> => {
    if (catUrl === undefined) {
      throw new Error('Missing CATURL in config')
    }

    const res = await axios.get<CatObject[]>(catUrl, headers)
    const cats = res.data

    // go through the array, sort it, then take the top 5
    const topCats = cats.map(this.newCatArray)
    topCats.sort((a, b) => b.total_score - a.total_score)

    const topFiveCats = topCats.slice(0, 5)
    return topFiveCats
  }

  newCatArray (newcat: CatObject): Cat {
    const totalScore = newcat.stranger_friendly + newcat.dog_friendly + newcat.child_friendly
    return {
      cat_name: newcat.name,
      child_friendly: newcat.child_friendly,
      dog_friendly: newcat.dog_friendly,
      stranger_friendly: newcat.stranger_friendly,
      total_score: totalScore,
      wiki_link: newcat.wikipedia_url,
      image: newcat.image
    }
  }
}
