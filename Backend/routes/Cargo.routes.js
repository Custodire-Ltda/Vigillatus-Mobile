import Express from 'express'
import { getCargos } from '../controllers/Cargo.controller.js'

const cargoRouter = Express.Router()

cargoRouter.get('/', getCargos)

export default cargoRouter