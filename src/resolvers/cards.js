import Fuse from "fuse.js"
import _ from "lodash"
import { Cards } from "netrunner-json"

const getCards = ({ filter, fuzzyFields, fuzzySearch, orderBy, reject }) => {
  const searchCfg = {
    distance: 100,
    keys: fuzzyFields || ["title"],
    location: 0,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.6,
    tokenize: true
  }
  const filterCards = filter ? _.filter(Cards, filter) : Cards
  const rejectCards = reject ? _.reject(filterCards, reject) : filterCards
  const searchCards = fuzzySearch
    ? new Fuse(rejectCards, searchCfg).search(fuzzySearch)
    : rejectCards
  return _.orderBy(searchCards, orderBy || ["title"])
}

const getDistinct = ({ field }) => {
  return _.chain(Cards)
    .uniqBy(field)
    .sortBy(field)
    .value()
}

export { getCards, getDistinct }
