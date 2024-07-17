import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries';
import Country from './components/Country';
import countryService from './services/countries';

function App() {
  const [countries, setCountries] = useState([])

  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  }, [])

  // clear selected country when filter is changed
  useEffect(() => {
    setSelectedCountry(null)
  }, [countryFilter])

  const countriesToShow = countryFilter == ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().search(countryFilter.toLowerCase()) >= 0)

  const countryDetail = selectedCountry ?? (countriesToShow.length == 1 ? countriesToShow[0] : null);

  return (
    <div>
      <Filter onCountryFilterChange={setCountryFilter} />
      <Countries countries={countriesToShow} onCountrySelected={setSelectedCountry} />
      <Country country={countryDetail} />
    </div>
  )
}

export default App
