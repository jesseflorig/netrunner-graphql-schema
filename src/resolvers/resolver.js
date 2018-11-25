import { getCardById, getDistinctByField, searchCards } from "./cards"

const resolverMap = {
  Card: {
    __resolveType(card, context, info) {
      switch (card.type) {
        case "AGENDA":
          return "Agenda"
        case "ASSET":
          return "Asset"
        case "EVENT":
          return "Event"
        case "HARDWARE":
          return "Hardware"
        case "ICE":
          return "Ice"
        case "IDENTITY":
          return card.side === "CORP" ? "CorpIdentity" : "RunnerIdentity"
        case "OPERATION":
          return "Operation"
        case "PROGRAM":
          return "Program"
        case "RESOURCE":
          return "Resource"
        case "UPGRADE":
          return "Upgrade"
      }

      return null
    }
  },
  Query: {
    getCardById(obj, args, contect, info) {
      return getCardById(args)
    },
    getDistinctByField(obj, args, context, info) {
      return getDistinctByField(args)
    },
    searchCards(obj, args, context, info) {
      return searchCards(args)
    }
  }
}

export default resolverMap
