import '../App.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await CarsAPI.getItemById(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await CarsAPI.deleteItem(id)
        navigate('/customcars')
    }

    if (!car) return <p>Loading...</p>

    return (
        <div className="car-details">
            <h2>{car.name}</h2>
            <ul>
                <li>Exterior: {car.exterior}</li>
                <li>Wheels: {car.wheels}</li>
                <li>Roof: {car.roof}</li>
                <li>Price: ${car.total_price}</li>
            </ul>
            <Link to={`/edit/${id}`}><button>Edit</button></Link>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
    )
}

export default CarDetails