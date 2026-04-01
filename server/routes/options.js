import express from 'express'
import OptionsController from '../controllers/options.js' // Assuming you make this controller next

const router = express.Router()

// Route to get all available options for the "menu"
router.get('/', OptionsController.getOptions)

// Route to get a specific option (e.g., just the 'Red Exterior' details)
router.get('/:id', OptionsController.getOptionById)

export default router