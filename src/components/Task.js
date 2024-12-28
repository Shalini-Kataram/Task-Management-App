import "../styles/task.scss";
import { useState } from "react";

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
        console.log(editedTask);
        setIsEditing(false);
    };

    return (
        <div className="p-4 mb-2 flex flex-wrap justify-between items-center border border-solid border-[#eeecda] rounded w-full">
            {isEditing ? (
                <div className="flex flex-col text-left w-full">
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="bg-transparent font-extrabold text-lg mb-2 border rounded p-2"
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="bg-transparent textarea font-extrabold text-sm mb-2 border rounded p-2"
                    />
                    <div className="mb-6 flex flex-row">
                        {["start", "in progress", "done"].map((stat) => (
                            <label
                                key={stat}
                                className={`text-[#132743] uppercase rounded ${
                                    stat === "done" && "bg-[#9ad3bc]"
                                } ${stat === "in progress" && "bg-[#edf285]"} ${
                                    stat === "start" && "bg-[#ffa5a5]"
                                } hover:cursor-pointer hover:bg-[#2ec1ac] hover:border-[#2ec1ac] px-1.5 py-0.2 mx-1 my-1 mr-1.5`}>
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
                    <p className="font-extrabold text-lg text-[#edc988] mb-1">
                        {task.title || "Untitled Task"}
                    </p>
                    <p className="font-extrabold text-sm text-[#eeecda] mb-1">
                        {task.description || "No description provided"}
                    </p>
                </div>
            )}

            <div className=" flex ">
                {!isEditing && (
                    <>
                        <p
                            className={`text-sm font-semibold uppercase mt-2 mr-3 ${
                                task.urgency === "high"
                                    ? "text-red-500"
                                    : task.urgency === "medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}>
                            {task.urgency || "No urgency set"}
                        </p>
                        <p
                            className={`text-sm font-semibold uppercase mt-2 mr-3 ${
                                task.status === "start"
                                    ? "text-red-500"
                                    : task.status === "in progress"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}>
                            {task.status || "No status set"}
                        </p>
                    </>
                )}

                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="button save mx-1"
                            aria-label="Save Task">
                            Save
                        </button>
                        <button
                            onClick={handleEditToggle}
                            className="button cancel mx-1"
                            aria-label="Cancel Editing">
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleEditToggle}
                            className="button edit mx-1"
                            aria-label="Edit Task">
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="button delete mx-1"
                            aria-label="Delete Task">
                            X
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
