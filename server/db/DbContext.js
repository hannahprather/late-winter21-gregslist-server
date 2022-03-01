import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'

import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/House'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  // adds to the db
  Cars = mongoose.model('Car', CarSchema);

  Houses = mongoose.model('House', HouseSchema);

  Account = mongoose.model('Account', AccountSchema);

  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
