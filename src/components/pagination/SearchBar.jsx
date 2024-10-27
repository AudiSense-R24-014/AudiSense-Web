import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
    return (
        <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6a4 4 0 100 8 4 4 0 000-8zm8 14l-4-4"
                    />
                </svg>
            </span>
            <input
                type="text"
                className="font-montserrat w-full text-sm px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
