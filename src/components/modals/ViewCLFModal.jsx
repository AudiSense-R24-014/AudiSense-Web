import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function ViewCLFModal({ visible, onClose, clf }) {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        CLF Record - {clf?.date?.split("T")[0]}
                    </h1>
                </div>

                {/* Basic Information */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Basic Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Device:
                            </span>{" "}
                            {clf?.basic?.device || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Aided Age:
                            </span>{" "}
                            {clf?.basic?.aidedAge || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Implant Age:
                            </span>{" "}
                            {clf?.basic?.implantAge || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Listening Age:
                            </span>{" "}
                            {clf?.basic?.listeningAge || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                AV or Other:
                            </span>{" "}
                            {clf?.basic?.AVorOther || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Ling Sounds */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Ling Sounds</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Detect:
                            </span>{" "}
                            {clf?.lingSounds?.detect || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Distance Detect:
                            </span>{" "}
                            {clf?.lingSounds?.distanceDetect || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Imitate:
                            </span>{" "}
                            {clf?.lingSounds?.imitate || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Distance Imitate:
                            </span>{" "}
                            {clf?.lingSounds?.distanceImitate || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Additional Conditions:
                            </span>{" "}
                            {clf?.lingSounds?.additionalConditions || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Hearing Loss */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Hearing Loss</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Degree:
                            </span>{" "}
                            {clf?.hearingLoss?.degree || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Etiology:
                            </span>{" "}
                            {clf?.hearingLoss?.etiology || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Audition */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Audition</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Comments:
                            </span>{" "}
                            {clf?.audition?.auditionComments || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Level:
                            </span>{" "}
                            {clf?.audition?.auditionLevel || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Language Development */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Language Development</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Receptive Vocabulary:
                            </span>{" "}
                            {clf?.language?.receptiveVocabulary || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Receptive Level:
                            </span>{" "}
                            {clf?.language?.receptiveLevel || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Expressive Vocabulary:
                            </span>{" "}
                            {clf?.language?.expressiveVocabulary || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Expressive Level:
                            </span>{" "}
                            {clf?.language?.expressiveLevel || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                MLU:
                            </span>{" "}
                            {clf?.language?.MLU || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                BnL phase or CASLLS:
                            </span>{" "}
                            {clf?.language?.BnLphaseorCASLLS || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Speech Production */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">Speech Production</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Vowels:
                            </span>{" "}
                            {clf?.speechProduction?.vowels || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Vowels Level:
                            </span>{" "}
                            {clf?.speechProduction?.vowelsLevel || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Consonants:
                            </span>{" "}
                            {clf?.speechProduction?.consonants || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Consonants Level:
                            </span>{" "}
                            {clf?.speechProduction?.consonantsLevel || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Intelligibility:
                            </span>{" "}
                            {clf?.speechProduction?.intelligibility || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Vocal Quality:
                            </span>{" "}
                            {clf?.speechProduction?.vocalQuality || "N/A"}
                        </p>
                    </div>
                </div>

                {/* General Development */}
                <div className="font-montserrat space-y-4 mt-4">
                    <h2 className="font-bold text-lg">General Development</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                        <p>
                            <span className="font-bold text-audi-purple">
                                Fine Motor:
                            </span>{" "}
                            {clf?.generalDevelopment?.fineMotor || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Gross Motor:
                            </span>{" "}
                            {clf?.generalDevelopment?.grossMotor || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Social:
                            </span>{" "}
                            {clf?.generalDevelopment?.social || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold text-audi-purple">
                                Cognitive:
                            </span>{" "}
                            {clf?.generalDevelopment?.cognitive || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="font-montserrat space-y-2 mt-4">
                    <h2 className="font-bold text-lg">Recommendations</h2>
                    <p className="text-sm">
                        <span className="font-bold text-audi-purple">General Recommendations:</span>{" "}
                        {clf?.recommendations?.general || "N/A"}
                    </p>
                    <p className="text-sm">
                        <span className="font-bold text-audi-purple">Specific Recommendations:</span>{" "}
                        {clf?.recommendations?.specific || "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}

ViewCLFModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    clf: PropTypes.object,
};
