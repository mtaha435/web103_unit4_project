import { pool } from '../config/database.js'

// GET all custom items
const getItems = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM custom_items ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// GET a single custom item by ID
const getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// CREATE a new custom item
const createItem = async (req, res) => {
    try {
        const { name, exterior, wheels, interior, roof, total_price } = req.body
        
        // Example of "Impossible Combo" validation (Required Feature)
        if (exterior === 'Convertible' && roof === 'Roof Rack') {
            return res.status(400).json({ error: "Cannot have a roof rack on a convertible!" })
        }

        const results = await pool.query(
            `INSERT INTO custom_items (name, exterior, wheels, interior, roof, total_price)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, exterior, wheels, interior, roof, total_price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// UPDATE an existing custom item
const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, exterior, wheels, interior, roof, total_price } = req.body
        
        const results = await pool.query(
            `UPDATE custom_items
            SET name = $1, exterior = $2, wheels = $3, interior = $4, roof = $5, total_price = $6
            WHERE id = $7
            RETURNING *`,
            [name, exterior, wheels, interior, roof, total_price, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// DELETE a custom item
const deleteItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM custom_items WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}