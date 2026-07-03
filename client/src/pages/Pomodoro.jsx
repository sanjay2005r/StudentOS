function Pomodoro({ timer }) {
    return (
        <div className="dashboard">
            <h2>
                🍅 Pomodoro
            </h2>
            <h1>
                {timer}:00
            </h1>
            <button>
                Start
            </button>
            <button>
                Reset
            </button>
        </div>
    );
}

export default Pomodoro;