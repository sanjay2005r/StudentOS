function Subjects({
    subjects,
    subjectData,
    handleSubjectChange,
    addSubject,
}) {
    return(
        <div>
            <h2>Add Subject</h2>

            <form onSubmit={addSubject}>
                <input
                    type="text"
                    name="name"
                    placeholder="Subject Name"
                    value={subjectData.name}
                    onChange={handleSubjectChange}
                />
                <br/>
                <br/>

                <input
                    type="number"
                    name="progress"
                    placeholder="Progress %"
                    value={subjectData.progress}
                    onChange={handleSubjectChange}
                />
                <br/>
                <br/>

                <button type="submit">
                    Add Subject
                </button>
            </form>

            <br/>

            <h2>Subjects</h2>

            {subjects.map((subject) => (
                <div key={subject.id}>
                    <p>
                        {subject.name}
                        {" - "}
                        {subject.progress}%
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Subjects;