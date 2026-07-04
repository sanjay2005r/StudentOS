function Pomodoro({ 
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    isRunning,
    hasStarted,
    setPomodoro25,
    setPomodoro50,
}) {
    return (
        <div className="dashboard">
            <h2>
                🍅 Pomodoro
            </h2>
            <h3>
                Focus Mode
            </h3>
            <button onClick={setPomodoro25}>
                25 min
            </button>
            <button onClick={setPomodoro50}>
                50 min
            </button>
            
            <br/> <br/>
            <h1>
                {timer}:00
            </h1>
            <button
                onClick={
                    isRunning ? pauseTimer : startTimer
                }
            >
                {/* {
                    timer === "25:00" ? "Start": (
                            isRunning ? "Pause" : "Resume"
                        )
                } */}
                {
                    timer === "25:00" ? "Start": (
                            !hasStarted ? "Start" :
                            (
                                isRunning ? "Pause" : "Resume"
                            )
                        )
                }
            </button>
            <button onClick={resetTimer}>
                Reset
            </button>
        </div>
    );
}

export default Pomodoro;