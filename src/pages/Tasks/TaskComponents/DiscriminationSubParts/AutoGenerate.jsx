import React, { useState } from "react";
import AutoGenerateService from "../../../../services/DiscriminationTask.service";
import Loading from "../../../../components/Loading";
import Swal from "sweetalert2";

const AutoGenerate = () => {
    const [age, setAge] = useState("");
    const [stage, setStage] = useState("");
    const [level, setLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedWords, setGeneratedWord] = useState({});
    const [isGenerated, setIsGenerated] = useState(false);

    const [firstWordSet, setFirstWordSet] = useState(null);
    const [secondWordSet, setSecondWordSet] = useState(null);
    const [indexOfRow, setIndexOfRow] = useState(null);

    const handleStageChange = (event) => {
        setStage(event.target.value);
    };

    const handleAgeChange = (event) => {
        event.preventDefault();
        setAge(event.target.value);
    };

    const handleLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleGeneration = async (event) => {
        event.preventDefault();
        setLoading(true);
        setIndexOfRow(null);
        AutoGenerateService.auto_generate(age, stage, level)
            .then((data) => {
                setGeneratedWord(data);
            })
            .catch((err) => {
                console.error("Error generating rhyming words: ", err);
            })
            .finally(() => {
                setLoading(false);
                setIsGenerated(true);
            });
    };

    const saveGeneratedWords = async (event) => {
        event.preventDefault();
        AutoGenerateService.createDiscriminationQuestion(
            firstWordSet,
            secondWordSet,
            parseInt(level)
        )
            .then((data) => {
                if (data._id) {
                    Swal.fire({
                        title: "Saved!",
                        text: "The generated words have been saved successfully",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: "The generated words could not be saved",
                        icon: "error",
                    });
                }
            })
            .catch((err) => {
                console.error("Error saving: ", err);
                Swal.fire({
                    title: "Failed!",
                    text: "The generated words could not be saved",
                    icon: "error",
                });
            });
    };

    const handleWordClick = (wordset) => {
        setFirstWordSet(wordset[0]);
        setSecondWordSet(wordset[1]);
        setIndexOfRow(generatedWords?.rhymes?.indexOf(wordset));
    };

    const radioOptions = [
        { value: "1", label: "Level 1" },
        { value: "2", label: "Level 2" },
    ];
    return (
        <div className="mt-5">
            <div className="text-base font-nunito font-bold">
                <label>Age:</label>
                <input
                    type="text"
                    value={age}
                    onChange={handleAgeChange}
                    placeholder="Enter Age"
                    className="ml-10 mt-6 mb-5 font-normal text-center w-32"
                />
            </div>
            <div className="text-base font-nunito font-bold">
                <label htmlFor="stage">Stage:</label>
                <select
                    id="stage"
                    value={stage}
                    onChange={handleStageChange}
                    className="ml-10 mt-6 mb-5 font-normal"
                >
                    <option value="" disabled>
                        Select Stage
                    </option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                </select>
            </div>

            <div className="flex items-center mb-4">
                <div className="mr-10">
                    <p className="text-base font-nunito font-bold">Level:</p>
                </div>
                <div className="flex">
                    {radioOptions.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center mr-5"
                        >
                            <input
                                type="radio"
                                id={option.value}
                                name="level"
                                value={option.value}
                                checked={level === option.value}
                                onChange={handleLevel}
                                className="mt-6 mb-5 mr-2"
                            />
                            <label
                                htmlFor={option.value}
                                className="mr-4 font-nunito"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <button
                    onClick={handleGeneration}
                    className={
                        "bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 " +
                        (loading
                            ? "cursor-not-allowed hover:bg-purple-400"
                            : "")
                    }
                    disabled={loading}
                >
                    {!loading ? "Generate Task" : "Generating ..."}
                </button>
                {loading && <Loading />}
            </div>
            <div className="mt-5">
                {isGenerated &&
                generatedWords.rhymes &&
                generatedWords.rhymes.length > 0 ? (
                    <div className="p-4">
                        <h3>Words:</h3>
                        {generatedWords.rhymes.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`mt-2 flex justify-center font-nunito p-2 border border-purple-400 rounded-md hover:bg-purple-400 transition-colors duration-200 ${
                                    indexOfRow === rowIndex
                                        ? "bg-purple-200"
                                        : ""
                                }`}
                                onClick={() => {
                                    handleWordClick(row);
                                }}
                            >
                                <button>
                                    {row.map((word, colIndex) => (
                                        <span
                                            key={colIndex}
                                            className="mr-2 p-2"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}
                <div>
                    {firstWordSet && secondWordSet && (
                        <div className="mt-5">
                            <button
                                onClick={saveGeneratedWords}
                                className="mt-4 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AutoGenerate;
