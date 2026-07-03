function Pomodoro({ 
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    isRunning,
}) {
    return (
        <div className="dashboard">
            <h2>
                🍅 Pomodoro
            </h2>
            <h1>
                {timer}:00
            </h1>
            <button
                onClick={
                    isRunning ? pauseTimer : startTimer
                }
            >
                {
                    timer === "25:00" ? "Start": (
                            isRunning ? "Pause" : "Resume"
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