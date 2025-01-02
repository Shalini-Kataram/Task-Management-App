import { useState } from "react";
import "../styles/App.scss";

export default function Task({ deleteTask, task, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setEditedTask({ ...task });
        }
    };

    const handleSave = () => {
        updateTask(editedTask);
        setIsEditing(false);
    };

    return (
        <div className="p-4 mb-2 flex flex-col justify-between sm:flex-row sm:flex-wrap sm:items-center items-center border border-gray-600 rounded-lg w-full bg-gray-800 shadow-md">
            {isEditing ? (
                <div className="flex flex-col text-left w-full">
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="bg-gray-700 text-gray-200 font-bold text-lg mb-2 border border-gray-600 rounded p-2 focus:outline-none focus:ring focus:ring-teal-400"
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="bg-gray-700 text-gray-200 font-normal text-sm mb-2 border border-gray-600 rounded p-2 focus:outline-none focus:ring focus:ring-teal-400"
                    />
                    <div className="mb-6 flex flex-row">
                        {["Start", "In Progress", "Done"].map((stat) => (
                            <label
                                key={stat}
                                className={`rounded px-2 py-1 mx-1 text-sm font-medium cursor-pointer transition-all ${
                                    stat === "Done"
                                        ? "bg-teal-500 text-gray-900 hover:bg-teal-600"
                                        : stat === "In Progress"
                                        ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                                        : "bg-red-500 text-gray-900 hover:bg-red-600"
                                }`}>
                                <input
                                    type="radio"
                                    name="status"
                                    value={stat}
                                    checked={editedTask.status === stat}
                                    className="hidden"
                                    onChange={handleChange}
                                />
                                {stat}
                            </label>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col text-center  max-w-full  sm:max-w-sm sm:text-left p-2">
                    <p className="font-bold text-lg text-teal-400 mb-1 break-words ">
                        {task.title || "Untitled Task"}
                    </p>
                    <p className="font-normal text-sm text-gray-300 mb-1 break-words">
                        {task.description || "No description provided"}
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm-items-center sm:justify-between gap-2">
                {!isEditing && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p
                            className={`text-sm sm:text-lg font-semibold mt-1 sm:mt-0 ${
                                task.urgency === "High"
                                    ? "text-red-500"
                                    : task.urgency === "Medium"
                                    ? "text-yellow-500"
                                    : "text-teal-400"
                            }`}>
                            {task.urgency || "No urgency set"}
                        </p>
                        <p
                            className={`text-sm sm:text-lg font-semibold mt-1 sm:mt-0 ${
                                task.status === "Start"
                                    ? "text-red-500"
                                    : task.status === "In Progress"
                                    ? "text-yellow-500"
                                    : "text-teal-400"
                            }`}>
                            {task.status || "No status set"}
                        </p>
                    </div>
                )}

                {isEditing ? (
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={handleSave}
                            className="bg-teal-500 text-gray-900 text-sm sm:text-base px-4 py-2 rounded hover:bg-teal-600 mx-1 transition-all focus:ring focus:ring-teal-400">
                            Save
                        </button>
                        <button
                            onClick={handleEditToggle}
                            className="bg-gray-600 text-gray-200 text-sm sm:text-base px-4 py-2 rounded hover:bg-gray-700 mx-1 transition-all focus:ring focus:ring-gray-400">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        <button
                            onClick={handleEditToggle}
                            className="bg-yellow-500 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded hover:bg-yellow-600 mx-1 transition-all focus:ring focus:ring-yellow-400  ">
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-gray-900 text-xs sm:text-sm px-3 py-1 rounded hover:bg-red-600 mx-1 transition-all focus:ring focus:ring-red-400">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
