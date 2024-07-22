import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name == '') {
            setCountry(null)
            return;
        }
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                setCountry({ ...response.data, found: true })
            })
            .catch((err) => {
                if (err.response.status) setCountry({ found: false })
                else setCountry(null)
            })
    }, [name])

    return country
}
