import { useState } from "react";
import "../styles/App.scss";

export default function Task(props) {
    const { deleteTask, task, updateTask } = props;

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
        <div className="p-4 mb-2 flex flex-wrap justify-between items-center border border-gray-600 rounded-lg w-full bg-gray-800 shadow-md">
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
                <div className="flex flex-col text-left">
                    <p className="font-bold text-lg text-teal-400 mb-1">
                        {task.title || "Untitled Task"}
                    </p>
                    <p className="font-normal text-sm text-gray-300 mb-1">
                        {task.description || "No description provided"}
                    </p>
                </div>
            )}

            <div className="flex items-center flex-wrap">
                {!isEditing && (
                    <>
                        <p
                            className={`text-lg font-semibold mt-1 mr-3 ${
                                task.urgency === "High"
                                    ? "text-red-500"
                                    : task.urgency === "Medium"
                                    ? "text-yellow-500"
                                    : "text-teal-400"
                            }`}>
                            {task.urgency || "No urgency set"}
                        </p>
                        <p
                            className={`text-lg font-semibold mt-1 mr-3 ${
                                task.status === "Start"
                                    ? "text-red-500"
                                    : task.status === "In Progress"
                                    ? "text-yellow-500"
                                    : "text-teal-400"
                            }`}>
                            {task.status || "No status set"}
                        </p>
                    </>
                )}

                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-teal-500 text-gray-900 px-4 py-2 rounded hover:bg-teal-600 mx-1 transition-all focus:ring focus:ring-teal-400">
                            Save
                        </button>
                        <button
                            onClick={handleEditToggle}
                            className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-700 mx-1 transition-all focus:ring focus:ring-gray-400">
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleEditToggle}
                            className="bg-yellow-500 text-gray-900 px-2 sm:px-4 lg:py-2 rounded hover:bg-yellow-600 mx-1 transition-all focus:ring focus:ring-yellow-400  ">
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-gray-900 px-2 sm:px-4 lg:py-2 rounded hover:bg-red-600 mx-1 transition-all focus:ring focus:ring-red-400">
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
