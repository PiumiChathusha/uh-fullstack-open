import { useEffect, useState } from 'react'

const Filter = ({ onNameFilterChange }) => {

    const [nameFilter, setNameFilter] = useState('')

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value)
        onNameFilterChange(event.target.value)
    }

    return (
        <form>
            <div>
                nameFilter: <input value={nameFilter} onChange={handleNameFilterChange} />
            </div>
        </form>
    )
}

export default Filter;