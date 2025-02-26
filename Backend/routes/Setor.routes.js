import Express from 'express'
import { getSetores } from '../controllers/Setor.controller.js'

const setorRouter = Express.Router()

setorRouter.get('/', getSetores)

export default setorRouter