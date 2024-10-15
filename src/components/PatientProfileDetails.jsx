import React from "react";
import PropTypes from "prop-types";

const PatientProfileDetails = ({ patient }) => {
    const childDetails = patient?.child;

    return (
        <div className="font-montserrat space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {/* Onset History */}
                <div>
                    <h3 className="font-bold text-lg">Onset History</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Age When Noticed:
                        </span>{" "}
                        {childDetails?.onSet?.ageWhenNoticed || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Age When First Sight:
                        </span>{" "}
                        {childDetails?.onSet?.ageWhenFirstSight || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Treatment History:
                        </span>{" "}
                        {childDetails?.onSet?.treatmentHistory || "N/A"}
                    </p>
                </div>

                {/* Natal History */}
                <div>
                    <h3 className="font-bold text-lg">Natal History</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Previous Pregnancies:
                        </span>{" "}
                        {childDetails?.natalHistory?.previousPregnancies ||
                            "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Pre-Natal:
                        </span>{" "}
                        {childDetails?.natalHistory?.preNatal || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Pre-Natal Birth Cry:
                        </span>{" "}
                        {childDetails?.natalHistory?.preNatalBirthCry || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Birth Weight:
                        </span>{" "}
                        {childDetails?.natalHistory?.birthWeight || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Post-Natal:
                        </span>{" "}
                        {childDetails?.natalHistory?.postNatal || "N/A"}
                    </p>
                </div>

                {/* Motor Milestones */}
                <div>
                    <h3 className="font-bold text-lg">Motor Milestones</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Head Held Up:
                        </span>{" "}
                        {childDetails?.motorMilestones?.headHeldUp || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Turned Over:
                        </span>{" "}
                        {childDetails?.motorMilestones?.turnedOver || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Crawling:
                        </span>{" "}
                        {childDetails?.motorMilestones?.crawling || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Walking Independently:
                        </span>{" "}
                        {childDetails?.motorMilestones?.walkingIndependently ||
                            "N/A"}
                    </p>
                </div>

                {/* Speech & Language Milestones */}
                <div>
                    <h3 className="font-bold text-lg">
                        Speech & Language Milestones
                    </h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Babbling:
                        </span>{" "}
                        {childDetails?.speechNLangMilestones?.babbling || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            First Word:
                        </span>{" "}
                        {childDetails?.speechNLangMilestones?.firstWord ||
                            "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Two-Word Phrases:
                        </span>{" "}
                        {childDetails?.speechNLangMilestones?.twoWordPhrases ||
                            "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Sentences:
                        </span>{" "}
                        {childDetails?.speechNLangMilestones?.sentences ||
                            "N/A"}
                    </p>
                </div>

                {/* Educational History */}
                <div>
                    <h3 className="font-bold text-lg">Educational History</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Difficulties:
                        </span>{" "}
                        {childDetails?.educationalHistory?.difficulties ||
                            "N/A"}
                    </p>
                </div>

                {/* Sensory Development */}
                <div>
                    <h3 className="font-bold text-lg">Sensory Development</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Response to Environmental Sounds:
                        </span>{" "}
                        {childDetails?.sensoryDevelopment
                            ?.responseToEnvSounds || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Response to Name Call:
                        </span>{" "}
                        {childDetails?.sensoryDevelopment?.responseToNameCall ||
                            "N/A"}
                    </p>
                </div>

                {/* Limitations */}
                <div>
                    <h3 className="font-bold text-lg">Limitations</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Motor:
                        </span>{" "}
                        {childDetails?.limitations?.motor || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Speech:
                        </span>{" "}
                        {childDetails?.limitations?.speech || "N/A"}
                    </p>
                </div>

                {/* Social Skills */}
                <div>
                    <h3 className="font-bold text-lg">Social Skills</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Social Smile:
                        </span>{" "}
                        {childDetails?.socialSkills?.socialSmile || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Initiates Interactions:
                        </span>{" "}
                        {childDetails?.socialSkills?.initiatesInteractions ||
                            "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Plays with Peer Group:
                        </span>{" "}
                        {childDetails?.socialSkills?.playsWithPeerGroup ||
                            "N/A"}
                    </p>
                </div>

                {/* Communication Skills */}
                <div>
                    <h3 className="font-bold text-lg">Communication Skills</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Audition:
                        </span>{" "}
                        {childDetails?.communicationSkills?.audition || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Language:
                        </span>{" "}
                        {childDetails?.communicationSkills?.language || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Speech:
                        </span>{" "}
                        {childDetails?.communicationSkills?.speech || "N/A"}
                    </p>
                </div>

                {/* Other Details */}
                <div>
                    <h3 className="font-bold text-lg">Other Details</h3>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Test Results:
                        </span>{" "}
                        {childDetails?.testResults || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Complaint:
                        </span>{" "}
                        {childDetails?.complaint || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Impression:
                        </span>{" "}
                        {childDetails?.impression || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Recommendation:
                        </span>{" "}
                        {childDetails?.recommendation || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Unusual Behaviours:
                        </span>{" "}
                        {childDetails?.unsualBehaviours || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Vegetative Skills & OPEM:
                        </span>{" "}
                        {childDetails?.vegetativeSkillsOPEM || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-audi-purple">
                            Handedness:
                        </span>{" "}
                        {childDetails?.handedness || "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};

PatientProfileDetails.propTypes = {
    patient: PropTypes.object,
};

export default PatientProfileDetails;
