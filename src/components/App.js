import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";
import { v4 as uuidv4 } from "uuid";
import Popup from "./Popup";

function App() {
    const [tasks, setTasks] = useState([]);
    let [urgencyLevel, setUrgencyLevel] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [statusLevel, setStatusLevel] = useState("");

    const togglePopup = () => {
        setIsFormVisible((prev) => !prev);
    };

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    const setUrgency = (level) => {
        setUrgencyLevel(level);
    };

    const setStatus = (stat) => {
        console.log(stat);
        setStatusLevel(stat);
    };

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

    function handleSubmit(event) {
        event.preventDefault();
        let newTask = {
            id: uuidv4(),
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            urgency: urgencyLevel,
            status: statusLevel,
        };
        addTask(newTask);
        event.target.reset();
        togglePopup();
    }

    return (
        <div className="relative font-kanit bg-[#1B2430] text-gray-100 flex flex-col items-center text-center w-full min-h-screen">
            <h1 className="mt-8 mb-4 font-bold text-4xl text-[#F5F5F5]">
                Task Management
            </h1>
            <button
                onClick={togglePopup}
                className="absolute top-2.5 right-2.5 px-4 py-2 rounded bg-teal-500 text-gray-800 font-medium shadow-lg transition-all hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-400">
                Add New Task
            </button>
            {!isFormVisible && (
                <Popup>
                    <div className="relative flex flex-col justify-center items-center border border-solid border-[#64748B] bg-[#1E293B] rounded p-4 mb-2 w-full max-w-md mx-4">
                        <button
                            onClick={togglePopup}
                            className="absolute top-1 right-1 text-white"
                            aria-label="Close Popup">
                            X
                        </button>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-800 p-6 rounded-lg shadow-xl w-full relative">
                            <input
                                type="text"
                                className="mb-2 py-2 w-full text-sm bg-gray-700 border border-gray-600 rounded text-center text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-cyan-400"
                                name="title"
                                placeholder="Enter Title"
                                aria-label="Task Title"
                            />
                            <textarea
                                rows="2"
                                className="mb-2 p-2 w-full text-sm resize-none bg-gray-700 border border-gray-600 rounded text-center text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-cyan-400"
                                name="description"
                                placeholder="Enter Description"
                                aria-label="Task Description"
                            />
                            <div className="mb-6 flex flex-wrap justify-center items-center">
                                {["Low", "Medium", "High"].map((level) => (
                                    <label
                                        key={level}
                                        className={`text-[#1E293B] rounded px-3 py-1 mx-1 my-1 text-sm transition-all duration-300 cursor-pointer ${
                                            level === "Low" &&
                                            "bg-[#0D7377] text-gray-800"
                                        } ${
                                            level === "Medium" &&
                                            "bg-[#FACC15] text-gray-800"
                                        } ${
                                            level === "High" &&
                                            "bg-[#F97316] text-gray-800"
                                        } hover:opacity-80 `}>
                                        <input
                                            type="radio"
                                            name="urgency"
                                            className="hidden"
                                            onChange={() => setUrgency(level)}
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                            <div className="mb-6 flex flex-wrap justify-center items-center">
                                {["Start", "In Progress", "Done"].map(
                                    (stat) => (
                                        <label
                                            className={`text-[#1E293B] rounded px-3 py-1 mx-1 my-1 text-sm transition-all duration-300 cursor-pointer ${
                                                stat === "Done"
                                                    ? "bg-[#14B8A6] text-gray-800"
                                                    : stat === "In Progress"
                                                    ? "bg-[#FACC15] text-gray-800"
                                                    : "bg-[#F97316] text-gray-800"
                                            } hover:opacity-80`}>
                                            <input
                                                type="radio"
                                                name="status"
                                                className="hidden"
                                                onChange={() => setStatus(stat)}
                                            />
                                            {stat}
                                        </label>
                                    )
                                )}
                            </div>
                            <button className="button text-gray-800 hover:opacity-80 focus:ring focus:outline-none focus:ring-cyan-400">
                                Save
                            </button>
                        </form>
                    </div>
                </Popup>
            )}
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
