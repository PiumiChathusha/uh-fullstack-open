const Person = ({ person, onPersonDeleted }) => {

    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            onPersonDeleted(person)
        }
    }

    return (
        <div>
            <p style={{ display: "inline-block" }} >{person.name} {person.number}</p>
            <button onClick={handleDelete}
                style={{ backgroundColor: "lightblue", marginLeft: "1em" }}>delete</button>
        </div>
    )
}

const Persons = ({ persons, onPersonDeleted }) => (
    <div>
        {
            ...persons.map(person =>
                <Person key={person.id} person={person} onPersonDeleted={onPersonDeleted}></Person>
            )
        }
    </div>
)


export default Persons;