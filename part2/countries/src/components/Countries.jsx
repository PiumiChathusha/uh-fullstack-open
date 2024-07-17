const CountryLine = ({ country, onCountrySelected }) => (
    <div>
        <p style={{ display: "inline-block", margin: "2px" }}>{country.name.common}</p>
        <button onClick={() => onCountrySelected(country)}
            style={{ background: "white", marginLeft: "1em", borderColor: "grey", borderRadius: "5px" }}>show</button>
    </div>
)

const Countries = ({ countries, onCountrySelected }) => {
    if (countries.length <= 1)
        return;
    else if (countries.length > 10)
        return (<p>Too many matches, specify another filter</p>)
    else
        return (
            <div>
                {
                    ...countries.map(country =>
                        <CountryLine key={country.name.official} country={country} onCountrySelected={onCountrySelected} />
                    )
                }
            </div>
        )
}

export default Countries;