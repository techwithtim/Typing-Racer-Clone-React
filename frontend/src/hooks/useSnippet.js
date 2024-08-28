import {useState, useEffect} from "react"
import { getSnippets } from "../api"

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[j]
        array[j] = array[i]
        array[i] = temp
    }
    return array
}
  

const useSnippet = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getSnippets()
            setData(shuffleArray(result))
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    const nextSnippet = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
    }

    useEffect(() => {
        if (data.length === 0) fetchData()
    }, [])

    return {
        currentSnippet: data[currentIndex] || null,
        loading,
        error,
        nextSnippet
    }
}

export default useSnippet