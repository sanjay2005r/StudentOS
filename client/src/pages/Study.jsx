function Study({
    studyHours,
    studyData,
    handleStudyChange,
    addStudyHour,
}) {
    return (
        <div>
            <h2>Study Hours</h2>

            <form onSubmit={addStudyHour}>
                <input
                    type="date"
                    name="study_date"
                    value={studyData.study_date}
                    onChange={handleStudyChange}
                />
                <br/><br/>

                <input
                    type="number"
                    name="hours"
                    placeholder="Hours studied"
                    value={studyData.hours}
                    onChange={handleStudyChange}
                />
                <br/><br/>
                
                <button type="subject">
                    Add Study Hours
                </button>
            </form>
            <br/>

            <h2>Study Records</h2>

            {studyHours.map((study) => (
                <div key={study.id}>
                    <p>
                        {study.study_date}
                        {" - "}
                        {study.hours} hrs
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Study;