import React, { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function Ling6SeparateView({ visible, onClose, getData, data, patients }) {
    if (!visible) {
        return null;
    }
    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-5/6 lg:w-1/2">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>

                    <h1 className="font-bold font-montserrat text-lg">
                        Ling6SeparateView
                    </h1>
                </div>
            </div>
            {/* Modal Content */}
        </div>
    )
}

Ling6SeparateView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
    getDate: PropTypes.func,
    patients: PropTypes.array.isRequired,
};