const API_URL = '/api/items' // Matches the route we set in server.js

// GET all custom items
const getAllItems = async () => {
    try {
        const response = await fetch(API_URL)
        return await response.json()
    } catch (error) {
        console.error("Error fetching all items:", error)
    }
}

// GET one item by ID
const getItemById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`)
        return await response.json()
    } catch (error) {
        console.error(`Error fetching item ${id}:`, error)
    }
}

// CREATE a new item
const createItem = async (itemData) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        }
        const response = await fetch(API_URL, options)
        return await response.json()
    } catch (error) {
        console.error("Error creating item:", error)
    }
}

// UPDATE an item
const updateItem = async (id, itemData) => {
    try {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        }
        const response = await fetch(`${API_URL}/${id}`, options)
        return await response.json()
    } catch (error) {
        console.error(`Error updating item ${id}:`, error)
    }
}

// DELETE an item
const deleteItem = async (id) => {
    try {
        const options = { method: 'DELETE' }
        const response = await fetch(`${API_URL}/${id}`, options)
        return await response.json()
    } catch (error) {
        console.error(`Error deleting item ${id}:`, error)
    }
}

export default {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}