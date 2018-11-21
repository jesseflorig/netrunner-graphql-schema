import Fuse from "fuse.js"
import _ from "lodash"
import { Cards } from "netrunner-json"

const searchCfg = {
  distance: 100,
  keys: ["title"],
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  threshold: 0.6
}

const getCards = ({ filter, queryString, reject }) => {
  const filterCards = filter ? _.filter(Cards, filter) : Cards
  const rejectCards = reject ? _.reject(filterCards, reject) : filterCards
  return queryString
    ? new Fuse(rejectCards, searchCfg).search(queryString)
    : rejectCards
}

const getDistinct = ({ field }) => {
  return _.chain(Cards)
    .uniqBy(field)
    .sortBy(field)
    .value()
}

export { getCards, getDistinct }
