import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import Popup from "./Popup";
import Form from "./Form";

export default function StatusLine({
    tasks,
    addTask,
    deleteTask,
    updatedTask,
}) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const togglePopup = () => {
        setIsFormVisible((prev) => !prev);
    };

    const handleSubmit = (event, urgency, status) => {
        event.preventDefault();
        let newTask = {
            id: uuidv4(),
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            urgency,
            status,
        };
        addTask(newTask);
        event.target.reset();
        togglePopup();
    };

    return (
        <div className="w-full mx-0 my-2 flex flex-col flex-wrap justify-center items-center bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="w-full flex flex-wrap justify-between items-center mb-4">
                <h3 className="font-bold text-2xl mb-5 text-gray-200">Tasks</h3>
                <button
                    onClick={togglePopup}
                    className="px-2 py-2 mb-4 rounded bg-teal-500 text-gray-800 font-medium shadow-lg transition-all hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-400">
                    Add New Task
                </button>
            </div>
            {isFormVisible && (
                <Popup>
                    <div className="relative flex flex-col justify-center items-center border border-solid border-[#64748B] bg-[#1E293B] rounded p-4 mb-2 w-full max-w-md mx-4">
                        <button
                            onClick={togglePopup}
                            className="absolute top-1 right-1 text-white"
                            aria-label="Close Popup">
                            X
                        </button>
                        <Form handleSubmit={handleSubmit}></Form>
                    </div>
                </Popup>
            )}
            {tasks.map((task, index) => (
                <Task
                    key={task.id || index}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    task={task}
                    updateTask={updatedTask}
                />
            ))}
        </div>
    );
}
