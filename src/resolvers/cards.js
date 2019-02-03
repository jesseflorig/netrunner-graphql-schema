import Fuse from "fuse.js"
import { filter, find, map, orderBy, reject, sortBy, uniqBy } from "lodash"
import { pipe } from "lodash/fp"
import { Cards } from "netrunner-json"

const getCardById = ({ id }) => {
  return find(Cards, { id: id })
}

const getDistinctByField = ({ field }) => {
  return pipe(
    uniqField(field),
    sortField(field)
  )(Cards)
}

const uniqField = field => Cards => {
  return uniqBy(Cards, field)
}

const sortField = field => Cards => {
  return sortBy(Cards, field)
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
    fuzzyCards(fuzzySearch, fuzzyFields),
    sortCards(sortFields)
  )(Cards)
}

const filterCards = filters => Cards => {
  // return filters ? filter(Cards, filters) : Cards
  let filteredCards = Cards
  map(filters, ft => {
    let filterObj = {}
    filterObj[ft.field] = ft.value
    const currentCards = filteredCards
    switch (ft.comparator) {
      case "ne":
        filteredCards = reject(currentCards, filterObj)
        break
      case "eq":
      default:
        filteredCards = filter(currentCards, filterObj)
    }
  })
  return filteredCards
}

const fuzzyCards = (fuzzySearch, fuzzyFields) => Cards => {
  if (fuzzySearch) {
    const searchCfg = {
      distance: 100,
      keys: fuzzyFields || ["title", "text"],
      location: 0,
      matchAllTokens: true,
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
