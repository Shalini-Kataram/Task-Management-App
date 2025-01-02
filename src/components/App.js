import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";
function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadedTasks = localStorage.getItem("tasks");
        setTasks(loadedTasks ? JSON.parse(loadedTasks) : []);
    }, []);

    const saveTasksToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addOrUpdateTask = (task) => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        const newTaskList = [...updatedTasks, task];
        setTasks(newTaskList);
        saveTasksToLocalStorage(newTaskList);
    };

    const updateTask = (updatedTask) => {
        setTasks(
            tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const deleteTask = (taskId) => {
        const remainingTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(remainingTasks);
        saveTasksToLocalStorage(remainingTasks);
    };

    return (
        <div className="relative font-kanit bg-[#1B2430] text-gray-100 flex flex-col items-center text-center w-full min-h-screen">
            <main className="flex flex-col items-center justify-start min-h-screen w-full">
                <h1 className="mt-8 mb-4 font-bold text-4xl text-[#F5F5F5]">
                    Task Management
                </h1>
                <section className="flex flex-wrap justify-center gap-4 w-full sm:w-4/5 max-w-7xl    px-4 py-8 rounded shadow-lg bg-gray-800">
                    <StatusLine
                        tasks={tasks}
                        addTask={addOrUpdateTask}
                        deleteTask={deleteTask}
                        updatedTask={updateTask}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
