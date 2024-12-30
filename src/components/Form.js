import React from "react";

const Form = ({ handleSubmit, setUrgency, setStatus }) => {
    return (
        <>
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
                            className={`text-[#1E293B] rounded px-2 sm:px-3 sm:text-sm py-1 mx-1 my-1 text-xs transition-all duration-300 cursor-pointer ${
                                level === "Low" && "bg-[#0D7377] text-gray-800"
                            } ${
                                level === "Medium" &&
                                "bg-[#FACC15] text-gray-800"
                            } ${
                                level === "High" && "bg-[#F97316] text-gray-800"
                            } hover:opacity-80`}>
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
                    {["Start", "In Progress", "Done"].map((stat) => (
                        <label
                            className={`text-[#1E293B] rounded px-1 sm:px-3 sm:text-sm py-1 mx-1 my-1 text-xs transition-all duration-300 cursor-pointer ${
                                stat === "Done"
                                    ? "bg-[#14B8A6] text-gray-800"
                                    : stat === "In Progress"
                                    ? "bg-[#FACC15] text-gray-800"
                                    : "bg-[#F97316] text-gray-800"
                            } hover:opacity-80 sm:text-sm`}>
                            <input
                                type="radio"
                                name="status"
                                className="hidden"
                                onChange={() => setStatus(stat)}
                            />
                            {stat}
                        </label>
                    ))}
                </div>
                <button className="button text-gray-800 hover:opacity-80 focus:ring focus:outline-none focus:ring-cyan-400">
                    Save
                </button>
            </form>
        </>
    );
};

export default Form;
