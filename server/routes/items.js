import express from 'express'
import ItemsController from '../controllers/items.js'

const router = express.Router()

// Route to get all created items
router.get('/', ItemsController.getItems)

// Route to get a specific item by its ID (for the detail page)
router.get('/:id', ItemsController.getItemById)

// Route to save a new created item
router.post('/', ItemsController.createItem)

// Route to update an existing item (edit)
router.patch('/:id', ItemsController.updateItem)

// Route to delete an item
router.delete('/:id', ItemsController.deleteItem)

export default router