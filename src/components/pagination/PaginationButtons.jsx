import React from "react";
import PropTypes from "prop-types";

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const maxPageNumbers = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

        if (endPage - startPage < maxPageNumbers - 1) {
            startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className="flex justify-center font-nunito items-center text-xs mt-4 space-x-2">
            <div>
                <button
                    className="bg-purple-400 text-white px-2 py-2 rounded-md disabled:bg-gray-300"
                    onClick={() => onPageChange("first")}
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button
                    className="ml-2 text-purple-400 disabled:text-gray-300"
                    onClick={() => onPageChange("previous")}
                    disabled={currentPage === 1}
                >
                    {"<<"}
                </button>
            </div>

            {getPageNumbers().map((number) => (
                <button
                    key={number}
                    className={`px-2 py-1 rounded-md ${
                        currentPage === number
                            ? "bg-purple-800 text-white"
                            : "bg-purple-400 text-white"
                    }`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            <div>
                <button
                    className="mr-2 text-purple-400 disabled:text-gray-300"
                    onClick={() => onPageChange("next")}
                    disabled={currentPage >= totalPages}
                >
                    {">>"}
                </button>
                <button
                    className="bg-purple-400 text-white px-2 py-2 rounded-md disabled:bg-gray-300"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage >= totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

PaginationButtons.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginationButtons;
