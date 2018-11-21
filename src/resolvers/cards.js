import Fuse from "fuse.js"
import _ from "lodash"
import { Cards } from "netrunner-json"

const searchCfg = {
  distance: 100,
  keys: ["title"],
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.6,
  tokenize: true
}

const getCards = ({ filter, fuzzyString, reject }) => {
  const filterCards = filter ? _.filter(Cards, filter) : Cards
  const rejectCards = reject ? _.reject(filterCards, reject) : filterCards
  return fuzzyString
    ? new Fuse(rejectCards, searchCfg).search(fuzzyString)
    : rejectCards
}

const getDistinct = ({ field }) => {
  return _.chain(Cards)
    .uniqBy(field)
    .sortBy(field)
    .value()
}

export { getCards, getDistinct }
