import { useState } from 'react'

const Filter = ({ onCountryFilterChange }) => {

    const [countryFilter, setCountryFilter] = useState('')

    const handleCountryFilterChange = (event) => {
        setCountryFilter(event.target.value)
        onCountryFilterChange(event.target.value)
    }

    return (
        <form>
            <div>
                find countries <input value={countryFilter} onChange={handleCountryFilterChange} />
            </div>
        </form>
    )
}

export default Filter;