import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class HousesService {

  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  async getById(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('not house id')
    }
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }
  async remove(houseId, userId) {
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('not your house dog')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }
}

export const housesService = new HousesService()