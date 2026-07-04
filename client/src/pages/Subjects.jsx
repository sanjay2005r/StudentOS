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
                <div
                    className="subject-card"
                    key={subject.id}
                >
                    <h3>
                        📚 {subject.name}
                    </h3>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${subject.progress}%`
                            }}
                        >
                        </div>
                    </div>
                    <p>
                        {subject.progress}%
                        Complete
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Subjects;