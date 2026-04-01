import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { calculateTotalPrice, OPTION_PRICES, BASE_PRICE } from '../utilities/priceHelpers'
import { validateCarCombination } from '../utilities/validationHelpers'

const CreateCar = () => {
    const navigate = useNavigate()
    
    // 1. Initial State
    const [car, setCar] = useState({
        name: '',
        exterior: 'Silver',
        wheels: 'Standard',
        interior: 'Fabric',
        roof: 'Standard',
        total_price: BASE_PRICE
    })
    const [error, setError] = useState('')

    // 2. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target
        
        setCar((prev) => {
            const updatedCar = { ...prev, [name]: value }
            
            // Recalculate price dynamically as selections change
            updatedCar.total_price = calculateTotalPrice(updatedCar)
            
            // Clear errors when user tries a new combination
            setError('')
            
            return updatedCar
        })
    }

    // 3. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Frontend Validation for Impossible Combinations
        const validation = validateCarCombination(car)
        if (!validation.isValid) {
            setError(validation.message)
            return // Stop submission
        }

        try {
            const response = await CarsAPI.createItem(car)
            if (response && !response.error) {
                navigate('/customcars') // Redirect to list view on success
            } else {
                setError(response.error || "Failed to save car.")
            }
        } catch (err) {
            setError("Server connection lost. Please try again.")
        }
    }

    return (
        <div className="create-car-container">
            <h1>Build Your Custom BoltBucket</h1>

            <div className="customizer-layout" style={{ display: 'flex', gap: '2rem' }}>
                
                {/* --- VISUAL PREVIEW SECTION --- */}
                <div className="visual-preview" style={{ flex: 1, border: '1px solid #ccc', padding: '1rem', textAlign: 'center' }}>
                    <h3>Preview: {car.exterior} {car.wheels} Edition</h3>
                    <div className={`car-icon ${car.exterior.replace(/\s+/g, '-').toLowerCase()}`}>
                        {/* You can swap images here based on state */}
                        <img 
                            src={`/assets/cars/${car.exterior.toLowerCase()}.png`} 
                            alt={car.exterior} 
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300x150?text=Car+Preview'}
                            style={{ width: '100%', maxWidth: '400px' }}
                        />
                    </div>
                    <div className="price-tag">
                        <h2 style={{ color: '#2ecc71' }}>Total: ${car.total_price.toLocaleString()}</h2>
                    </div>
                </div>

                {/* --- FORM SECTION --- */}
                <div className="selection-form" style={{ flex: 1 }}>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-banner" style={{ background: '#ffcccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', color: '#b30000' }}>
                            {error}
                        </div>}

                        <label>Design Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="e.g., My Dream Ride" 
                            value={car.name} 
                            onChange={handleChange} 
                            required 
                        />

                        <label>Exterior Color & Style</label>
                        <select name="exterior" value={car.exterior} onChange={handleChange}>
                            {Object.keys(OPTION_PRICES.exterior).map(opt => (
                                <option key={opt} value={opt}>{opt} (+${OPTION_PRICES.exterior[opt]})</option>
                            ))}
                        </select>

                        <label>Wheels</label>
                        <select name="wheels" value={car.wheels} onChange={handleChange}>
                            {Object.keys(OPTION_PRICES.wheels).map(opt => (
                                <option key={opt} value={opt}>{opt} (+${OPTION_PRICES.wheels[opt]})</option>
                            ))}
                        </select>

                        <label>Interior Material</label>
                        <select name="interior" value={car.interior} onChange={handleChange}>
                            {Object.keys(OPTION_PRICES.interior).map(opt => (
                                <option key={opt} value={opt}>{opt} (+${OPTION_PRICES.interior[opt]})</option>
                            ))}
                        </select>

                        <label>Roof Options</label>
                        <select name="roof" value={car.roof} onChange={handleChange}>
                            {Object.keys(OPTION_PRICES.roof).map(opt => (
                                <option key={opt} value={opt}>{opt} (+${OPTION_PRICES.roof[opt]})</option>
                            ))}
                        </select>

                        <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
                            Create Custom Car
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCar