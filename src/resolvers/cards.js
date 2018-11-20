import Fuse from "fuse.js"
import Cards from "netrunner-json"

const searchCfg = {
  distance: 100,
  keys: ["title"],
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  threshold: 0.6
}

const getCards = ({ queryString }) => {
  const fuse = new Fuse(Cards, searchCfg)
  const results = fuse.search(queryString)
  return results
}

export { getCards }
