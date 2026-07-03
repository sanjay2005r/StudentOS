function Tasks({
    tasks,
    taskData,
    handleTaskChange,
    addTask,
}) {
    return (
        <div>
            <h2>Add Task</h2>

            <form onSubmit={addTask}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleTaskChange}
                />
                <br/>
                <br/>

                <input
                    type="date"
                    name="deadline"
                    value={taskData.deadline}
                    onChange={handleTaskChange}
                />
                <br/>
                <br/>

                <select
                    name="status"
                    value={taskData.status}
                    onChange={handleTaskChange}
                >
                    <option value="Pending">
                        Pending
                    </option>
                    <option value="Completed">
                        Completed
                    </option>
                </select>
                <br/><br/>

                <button type="submit">
                    Add Task
                </button>
            </form>
            <br/>

            <h2>Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>
                        {task.title}
                        {" | "}
                        {task.deadline}
                        {" | "}
                        {task.status}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Tasks;