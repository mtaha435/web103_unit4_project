import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { calculateTotalPrice, OPTION_PRICES } from '../utilities/priceHelpers'
import { validateCarCombination } from '../utilities/validationHelpers'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    // 1. Fetch the existing car data on load
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const data = await CarsAPI.getItemById(id)
                setCar(data)
                setLoading(false)
            } catch (err) {
                setError("Could not load car data.")
                setLoading(false)
            }
        }
        fetchCarData()
    }, [id])

    // 2. Handle changes for ALL fields
    const handleChange = (e) => {
        const { name, value } = e.target
        
        setCar((prev) => {
            const updatedCar = { ...prev, [name]: value }
            
            // Recalculate price dynamically as user edits
            updatedCar.total_price = calculateTotalPrice(updatedCar)
            setError('') // Clear previous errors
            
            return updatedCar
        })
    }

    // 3. Submit updates to the database
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Apply the same validation as the Create page
        const validation = validateCarCombination(car)
        if (!validation.isValid) {
            setError(validation.message)
            return
        }

        try {
            await CarsAPI.updateItem(id, car)
            navigate(`/customcars/${id}`) // Redirect to details page
        } catch (err) {
            setError("Failed to update car. Please try again.")
        }
    }

    if (loading) return <p>Loading car details...</p>
    if (!car) return <p>Car not found.</p>

    return (
        <div className="edit-car-container">
            <h1>Edit: {car.name}</h1>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Visual Preview */}
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem', textAlign: 'center' }}>
                    <img 
                        src={`/assets/cars/${car.exterior.toLowerCase()}.png`} 
                        alt={car.exterior} 
                        onError={(e) => e.target.src = 'https://via.placeholder.com/300x150?text=Car+Preview'}
                        style={{ width: '100%', maxWidth: '400px' }}
                    />
                    <h2 style={{ color: '#2ecc71' }}>Updated Price: ${car.total_price.toLocaleString()}</h2>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                    {error && <p style={{ color: 'red', background: '#fee', padding: '10px' }}>{error}</p>}

                    <label>Design Name</label>
                    <input name="name" value={car.name} onChange={handleChange} required />

                    <label>Exterior</label>
                    <select name="exterior" value={car.exterior} onChange={handleChange}>
                        {Object.keys(OPTION_PRICES.exterior).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <label>Wheels</label>
                    <select name="wheels" value={car.wheels} onChange={handleChange}>
                        {Object.keys(OPTION_PRICES.wheels).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <label>Interior</label>
                    <select name="interior" value={car.interior} onChange={handleChange}>
                        {Object.keys(OPTION_PRICES.interior).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <label>Roof</label>
                    <select name="roof" value={car.roof} onChange={handleChange}>
                        {Object.keys(OPTION_PRICES.roof).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <button type="submit" style={{ marginTop: '1rem', width: '100%' }}>Update Design</button>
                </form>
            </div>
        </div>
    )
}

export default EditCar