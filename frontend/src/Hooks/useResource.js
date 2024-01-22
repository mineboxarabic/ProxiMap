import useAxiosPrivate from "./useAxiosPrivate"
import { useState } from "react"
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const getAll = async () => {
        console.log('getAll')
        setLoading(true)
        setError('')
        try {
            const response = await axiosPrivate.get(baseUrl)
            setResources(response.data)
            setSuccess('Resource fetched successfully')
            setLoading(false)
        } catch (error) {
            
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    }

    const create = async (resource) => {
        setLoading(true)
        setError('')

        try {
            const response = await axiosPrivate.post(baseUrl, resource)
            setResources([...resources, response.data])
            setSuccess('Resource created successfully')
            setLoading(false)
        } catch (error) {
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    }

    const update = async (resource) => {
        setLoading(true)
        setError('')

        try {
            const response = await axiosPrivate.put(`${baseUrl}/${resource._id}`, resource)
            setResources(response.data)
            setSuccess('Resource updated successfully')
            setLoading(false)
        } catch (error) {
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }
            else if(error.response.data.error?.[0].msg){
                setError(error.response.data.error[0].msg)
            }
            else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    }

    const remove = async (id) => {
        setLoading(true)
        setError('')

        try {
            await axiosPrivate.delete(`${baseUrl}/${id}`)
            setResources(resources.filter((item) => item._id !== id))
            setSuccess('Resource deleted successfully')
            setLoading(false)
        } catch (error) {
            console.log(error)
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }
            if(error.response.data.error[0].msg){
                setError(error.response.data.error[0].msg)
            }
            else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    }

    const getOne = async (id) => {
        setLoading(true)
        setError('')

        try {
            const response = await axiosPrivate.get(`${baseUrl}/${id}`)
            setLoading(false)
            //remove the / from the baseUrl
            setSuccess('Resource fetched successfully')
            setResources(response.data)
            return response.data
        } catch (error) {
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    }

    const updateWithForm = async (id, formData) => {
        setLoading(true)
        setError('')

        try {
            const response = await axiosPrivate.put(`${baseUrl}/${id}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            
            })
            setResources(response.data)
            setSuccess('Resource updated successfully')
            setLoading(false)
        } catch (error) {
            if(error?.response?.status === 500){
                setError(error.response.data.message)
            }
            else if(error.response.data.error?.[0].msg){
                setError(error.response.data.error[0].msg)
            }
            else if(error?.response?.status === 404){
                setError("Resource not found")
            
            }else if(error?.response?.status === 401){
                setError("You are not authorized to access this resource")
            }
            else{
                setError("Error while getting the resource")
            }
            setSuccess('')
            setLoading(false)
        }
    
    }

    return { resources,setResources, loading, error, getAll, create, update, remove, getOne ,success ,setSuccess, setError, updateWithForm}


}

export default useResource;