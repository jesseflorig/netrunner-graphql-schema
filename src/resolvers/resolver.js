import { searchCards } from "./cards"

const resolverMap = {
  Query: {
    searchCards(obj, args, context, info) {
      const cards = getCards(args)
      return cards
    }
  }
}

export default resolverMap
