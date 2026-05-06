import {getData, createNewData, updateData, readData, deleteData} from '../controllers/orderController.js'
import express from 'express'
import auth from '../middleware/auth.js'

const route = express.Router()

route.get('/', auth, getData)
route.post('/new', auth, createNewData)
route.delete('/delete/:id',auth,deleteData)
route.put('/update/:id',auth, updateData)
route.get('/read/:id',auth, readData)

export default route