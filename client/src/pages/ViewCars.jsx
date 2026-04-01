import '../App.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            const data = await CarsAPI.getAllItems()
            setCars(data)
        }
        fetchCars()
    }, [])

    return (
        <div className="view-cars">
            <h2>Saved Custom Designs</h2>
            <div className="cars-grid">
                {cars.length > 0 ? cars.map((car) => (
                    <div key={car.id} className="car-card">
                        <h3>{car.name}</h3>
                        <p>Total: ${car.total_price}</p>
                        <Link to={`/customcars/${car.id}`}><button>View Details</button></Link>
                    </div>
                )) : <p>No custom cars created yet!</p>}
            </div>
        </div>
    )
}

export default ViewCars