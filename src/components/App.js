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
        <div className="font-serif bg-[#132743] text-[#eeecda] flex flex-col items-center text-center ">
            <h1 className="mx-8 my-8 font-extrabold text-4xl">
                Task Management
            </h1>
            <button
                onClick={togglePopup}
                className="absolute top-2.5 right-2.5 border border-solid uppercase w-fit px-6 py-1.5 bg-[#9ad3bc] border-[#9ad3bc] text-[#132743] font-normal rounded text-sm hover:bg-[#2ec1ac] hover:border-[#2ec1ac] hover:cursor-pointer focus:outline-none focus:border-[#2ec1ac] focus:bg-[#2ec1ac] focus:text-white">
                Add New Task
            </button>
            {!isFormVisible && (
                <Popup>
                    <div className="relative flex justify-center items-center border border-solid border-[#eeecda] rounded p-4 mb-2 ">
                        <button
                            onClick={togglePopup}
                            className="absolute top-1 right-1 text-white"
                            aria-label="Delete Task">
                            X
                        </button>
                        <form
                            onSubmit={handleSubmit}
                            className=" flex flex-col items-center text-center mx-0 my-1">
                            <input
                                type="text"
                                className="mb-2 py-2 w-full text-lg bg-transparent border border-solid border-transparent rounded text-[#eeecda] text-center resize-none flex font-serif hover:cursor-pointer hover:border hover:border-solid hover:border-[#eeecda] focus:outline-none focus:border-[#edc988] focus:text-[#edc988] placeholder:text-[#eeecda]"
                                name="title"
                                placeholder="Enter Title"
                                aria-label="Task Title"
                            />
                            <textarea
                                rows="2"
                                className="mb-2 p-2 w-full bg-transparent border border-solid border-transparent rounded text-center flex text-lg hover:cursor-text hover:border hover:border-solid hover:border-[#eeecda] focus:outline-none focus:border-[#edc988] focus:text-[#edc988] placeholder:text-[#eeecda]"
                                name="description"
                                placeholder="Enter Description"
                                aria-label="Task Description"
                            />
                            <div className="mb-6 flex flex-row">
                                {["low", "medium", "high"].map((level) => (
                                    <label
                                        key={level}
                                        className={`text-[#132743] uppercase rounded ${
                                            level === "low" && "bg-[#9ad3bc]"
                                        } ${
                                            level === "medium" && "bg-[#edf285]"
                                        } ${
                                            level === "high" && "bg-[#ffa5a5]"
                                        } hover:cursor-pointer hover:bg-[#2ec1ac] hover:border-[#2ec1ac] px-1.5 py-0.2 mx-1 my-1 mr-1.5`}>
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
                            <div className="mb-6 flex flex-row">
                                {["start", "in progress", "done"].map(
                                    (stat) => (
                                        <label
                                            key={stat}
                                            className={`text-[#132743] uppercase rounded ${
                                                stat === "done" &&
                                                "bg-[#9ad3bc]"
                                            } ${
                                                stat === "in progress" &&
                                                "bg-[#edf285]"
                                            } ${
                                                stat === "start" &&
                                                "bg-[#ffa5a5]"
                                            } hover:cursor-pointer hover:bg-[#2ec1ac] hover:border-[#2ec1ac] px-1.5 py-0.2 mx-1 my-1 mr-1.5`}>
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
                            <button className="border border-solid uppercase w-fit px-6 py-1.5 bg-[#9ad3bc] border-[#9ad3bc] text-[#132743] font-normal rounded text-sm hover:bg-[#2ec1ac] hover:border-[#2ec1ac] hover:cursor-pointer focus:outline-none focus:border-[#2ec1ac] focus:bg-[#2ec1ac] focus:text-white">
                                Save
                            </button>
                        </form>
                    </div>
                </Popup>
            )}
            <main>
                <section>
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
