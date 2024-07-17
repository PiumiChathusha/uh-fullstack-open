const Header = ({ course }) => {
    return (
        <h2>{course}</h2>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {...parts.map((p) => <Part part={p} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((a, b) => a + b.exercises, 0);
    return (
        <b>total of exercises {totalExercises}</b>
    )
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course;