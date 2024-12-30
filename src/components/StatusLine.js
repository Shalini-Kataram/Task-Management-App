import React from "react";
import Task from "./Task";

export default function StatusLine(props) {
    const { tasks, addTask, deleteTask, updatedTask } = props;

    return (
        <div className="w-full mx-0 my-2 flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-2xl mb-5 text-gray-200">Tasks</h3>
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
