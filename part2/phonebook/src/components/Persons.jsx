const Person = ({ person }) => (
    <p key={person.name}>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => (
    <div>
        {
            ...persons.map(person =>
                <Person person={person}></Person>
            )
        }
    </div>
)


export default Persons;