import BaseController from "../utils/BaseController"
import { housesService } from "../services/HousesService"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { Forbidden } from "../utils/Errors"
export class HousesController extends BaseController {

  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }


  async getAll(req, res, next) {
    try {
      const houses = await housesService.getAll(req.query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const house = await housesService.getById(req.params.id)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.create(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async edit(update) {
    const origional = await this.getById(update.id)
    if (origional.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('not yo house')
    }
    origional.bedrooms = update.bedrooms ? update.bedrooms : origional.bedrooms
    origional.bathrooms = update.bathrooms ? 
}
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const houseId = req.params.id
      await housesService.remove(houseId, userId)
      return res.send('goodbye')
    } catch (error) {
      next(error)
    }
  }
}

