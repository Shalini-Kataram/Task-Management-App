import React from "react";
import "../styles/statusLine.scss";
import Task from "./Task";

export default function StatusLine(props) {
    const { tasks, addTask, deleteTask, updatedTask } = props;

    return (
        <div className="w-full mx-0 my-2 flex flex-col justify-center items-center">
            <h3 className="font-extrabold text-xl mb-5">Tasks</h3>
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
