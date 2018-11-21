import { getCards, getDistinct } from "./cards"

const resolverMap = {
  Query: {
    searchCards(obj, args, context, info) {
      return getCards(args)
    },
    getDistinct(obj, args, context, info) {
      return getDistinct(args)
    }
  }
}

export default resolverMap
