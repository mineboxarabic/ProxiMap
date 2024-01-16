import useAxiosPrivate from "./useAxiosPrivate"
import { useState } from "react"
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const axiosPrivate = useAxiosPrivate();

    const getAll = async () => {
        setLoading(true)
        try {
            const response = await axiosPrivate.get(baseUrl)
            setResources(response.data)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    const create = async (resource) => {
        setLoading(true)
        try {
            const response = await axiosPrivate.post(baseUrl, resource)
            setResources([...resources, response.data])
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    const update = async (resource) => {
        setLoading(true)
        try {
            const response = await axiosPrivate.put(`${baseUrl}/${resource._id}`, resource)
            setResources(resources.map((item) => item._id === resource._id ? response.data : item))
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    const remove = async (id) => {
        setLoading(true)
        try {
            await axiosPrivate.delete(`${baseUrl}/${id}`)
            setResources(resources.filter((item) => item._id !== id))
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    return { resources,setResources, loading, error, getAll, create, update, remove }


}

export default useResource;