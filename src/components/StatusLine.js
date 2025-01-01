import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import Popup from "./Popup";
import Form from "./Form";

export default function StatusLine(props) {
    const { tasks, addTask, deleteTask, updatedTask } = props;
    let [urgencyLevel, setUrgencyLevel] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [statusLevel, setStatusLevel] = useState("");

    const togglePopup = () => {
        setIsFormVisible((prev) => !prev);
    };

    const setUrgency = (level) => {
        setUrgencyLevel(level);
    };

    const setStatus = (stat) => {
        console.log(stat);
        setStatusLevel(stat);
    };

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
        <div className="w-full mx-0 my-2 flex flex-col flex-wrap justify-center items-center bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="w-full flex flex-wrap justify-between items-center mb-4">
                <h3 className="font-bold text-2xl mb-5 text-gray-200">Tasks</h3>
                <button
                    onClick={togglePopup}
                    className="px-4 py-2 mb-4 rounded bg-teal-500 text-gray-800 font-medium shadow-lg transition-all hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-400">
                    Add New Task
                </button>
            </div>
            {!isFormVisible && (
                <Popup>
                    <div className="relative flex flex-col flex-wrap justify-center items-center border border-solid border-[#64748B] bg-[#1E293B] rounded p-4 mb-2 w-full max-w-md mx-4">
                        <button
                            onClick={togglePopup}
                            className="absolute top-1 right-1 text-white"
                            aria-label="Close Popup">
                            X
                        </button>
                        <Form
                            handleSubmit={handleSubmit}
                            setUrgency={setUrgency}
                            setStatus={setStatus}></Form>
                    </div>
                </Popup>
            )}
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    task={task}
                    updateTask={updatedTask}
                />
            ))}
        </div>
    );
}
