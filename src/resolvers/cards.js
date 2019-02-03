import Fuse from "fuse.js"
import { chain, filter, find, orderBy, reject } from "lodash"
import { pipe } from "lodash/fp"
import { Cards } from "netrunner-json"

const getCardById = ({ id }) => {
  return find(Cards, { id: id })
}

const getDistinctByField = ({ field }) => {
  return chain(Cards)
    .uniqBy(field)
    .sortBy(field)
    .value()
}

const searchCards = ({
  filters,
  fuzzyFields,
  fuzzySearch,
  notFilters,
  sortFields
}) => {
  return pipe(
    filterCards(filters),
    rejectCards(notFilters),
    fuzzyCards(fuzzySearch, fuzzyFields),
    sortCards(sortFields)
  )(Cards)
}

const filterCards = filters => Cards => {
  return filters ? filter(Cards, filters) : Cards
}

const rejectCards = notFilters => Cards => {
  return notFilters ? reject(Cards, notFilters) : Cards
}

const fuzzyCards = (fuzzySearch, fuzzyFields) => Cards => {
  if (fuzzySearch) {
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
    return new Fuse(Cards, searchCfg).search(fuzzySearch)
  }
  return Cards
}

const sortCards = sortFields => Cards => {
  return sortFields ? orderBy(Cards, sortFields) : Cards
}

export { getCardById, getDistinctByField, searchCards }
