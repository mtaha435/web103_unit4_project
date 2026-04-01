import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../App.css'

const EditCar = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        await CarsAPI.updateItem(id, car)
        navigate(`/customcars/${id}`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCar(prev => ({ ...prev, [name]: value }))
    }

    if (!car) return <p>Loading...</p>

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit {car.name}</h2>
            <input name="name" value={car.name} onChange={handleChange} />
            {/* Repeat other select inputs as in CreateCar, using value={car.exterior} etc. */}
            <button type="submit">Update Design</button>
        </form>
    )
}

export default EditCar