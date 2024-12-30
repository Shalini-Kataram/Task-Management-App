import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";

function App() {
    const [tasks, setTasks] = useState([]);

    const togglePopup = () => {
        setIsFormVisible((prev) => !prev);
    };

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    function addTask(taskToAdd) {
        const filteredTasks = tasks.filter((task) => task.id !== taskToAdd.id);
        const newTaskList = [...filteredTasks, taskToAdd];
        setTasks(newTaskList);
        saveTasksToLocalStorage(newTaskList);
    }

    const updatedTask = (updateTask) => {
        setTasks(
            tasks.map((task) => (task.id === updateTask.id ? updateTask : task))
        );
    };

    function deleteTask(taskId) {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
        saveTasksToLocalStorage(filteredTasks);
    }

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const loadedTasks = localStorage.getItem("tasks");
        const parsedTasks = loadedTasks ? JSON.parse(loadedTasks) : [];
        setTasks(parsedTasks);
    }

    return (
        <div className="relative font-kanit bg-[#1B2430] text-gray-100 flex flex-col items-center text-center w-full min-h-screen">
            <h1 className="mt-8 mb-4 font-bold text-4xl text-[#F5F5F5]">
                Task Management
            </h1>
            <main className="flex flex-col items-center justify-start min-h-screen w-full">
                <section className="flex flex-wrap justify-center gap-4 w-full sm:w-4/5 max-w-7xl m-8 px-4 rounded shadow-lg">
                    <StatusLine
                        tasks={tasks}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        updatedTask={updatedTask}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
