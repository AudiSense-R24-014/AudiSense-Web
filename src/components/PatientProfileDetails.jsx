import React from "react";
import PropTypes from "prop-types";

const PatientProfileDetails = ({ patient }) => {
    const childDetails = patient?.child;

    return (
        <div className="font-montserrat space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Onset History */}
                <div>
                    <h3 className="font-bold text-lg">Onset History</h3>
                    <p>Age When Noticed: {childDetails?.onSet?.ageWhenNoticed || "N/A"}</p>
                    <p>Age When First Sight: {childDetails?.onSet?.ageWhenFirstSight || "N/A"}</p>
                    <p>Treatment History: {childDetails?.onSet?.treatmentHistory || "N/A"}</p>
                </div>

                {/* Natal History */}
                <div>
                    <h3 className="font-bold text-lg">Natal History</h3>
                    <p>Previous Pregnancies: {childDetails?.natalHistory?.previousPregnancies || "N/A"}</p>
                    <p>Pre-Natal: {childDetails?.natalHistory?.preNatal || "N/A"}</p>
                    <p>Pre-Natal Birth Cry: {childDetails?.natalHistory?.preNatalBirthCry || "N/A"}</p>
                    <p>Birth Weight: {childDetails?.natalHistory?.birthWeight || "N/A"}</p>
                    <p>Post-Natal: {childDetails?.natalHistory?.postNatal || "N/A"}</p>
                </div>

                {/* Motor Milestones */}
                <div>
                    <h3 className="font-bold text-lg">Motor Milestones</h3>
                    <p>Head Held Up: {childDetails?.motorMilestones?.headHeldUp || "N/A"}</p>
                    <p>Turned Over: {childDetails?.motorMilestones?.turnedOver || "N/A"}</p>
                    <p>Crawling: {childDetails?.motorMilestones?.crawling || "N/A"}</p>
                    <p>Walking Independently: {childDetails?.motorMilestones?.walkingIndependently || "N/A"}</p>
                </div>

                {/* Speech & Language Milestones */}
                <div>
                    <h3 className="font-bold text-lg">Speech & Language Milestones</h3>
                    <p>Babbling: {childDetails?.speechNLangMilestones?.babbling || "N/A"}</p>
                    <p>First Word: {childDetails?.speechNLangMilestones?.firstWord || "N/A"}</p>
                    <p>Two-Word Phrases: {childDetails?.speechNLangMilestones?.twoWordPhrases || "N/A"}</p>
                    <p>Sentences: {childDetails?.speechNLangMilestones?.sentences || "N/A"}</p>
                </div>

                {/* Educational History */}
                <div>
                    <h3 className="font-bold text-lg">Educational History</h3>
                    <p>Difficulties: {childDetails?.educationalHistory?.difficulties || "N/A"}</p>
                </div>

                {/* Sensory Development */}
                <div>
                    <h3 className="font-bold text-lg">Sensory Development</h3>
                    <p>Response to Environmental Sounds: {childDetails?.sensoryDevelopment?.responseToEnvSounds || "N/A"}</p>
                    <p>Response to Name Call: {childDetails?.sensoryDevelopment?.responseToNameCall || "N/A"}</p>
                </div>

                {/* Limitations */}
                <div>
                    <h3 className="font-bold text-lg">Limitations</h3>
                    <p>Motor: {childDetails?.limitations?.motor || "N/A"}</p>
                    <p>Speech: {childDetails?.limitations?.speech || "N/A"}</p>
                </div>

                {/* Social Skills */}
                <div>
                    <h3 className="font-bold text-lg">Social Skills</h3>
                    <p>Social Smile: {childDetails?.socialSkills?.socialSmile || "N/A"}</p>
                    <p>Initiates Interactions: {childDetails?.socialSkills?.initiatesInteractions || "N/A"}</p>
                    <p>Plays with Peer Group: {childDetails?.socialSkills?.playsWithPeerGroup || "N/A"}</p>
                </div>

                {/* Communication Skills */}
                <div>
                    <h3 className="font-bold text-lg">Communication Skills</h3>
                    <p>Audition: {childDetails?.communicationSkills?.audition || "N/A"}</p>
                    <p>Language: {childDetails?.communicationSkills?.language || "N/A"}</p>
                    <p>Speech: {childDetails?.communicationSkills?.speech || "N/A"}</p>
                </div>

                {/* Other Details */}
                <div>
                    <h3 className="font-bold text-lg">Other Details</h3>
                    <p>Test Results: {childDetails?.testResults || "N/A"}</p>
                    <p>Complaint: {childDetails?.complaint || "N/A"}</p>
                    <p>Impression: {childDetails?.impression || "N/A"}</p>
                    <p>Recommendation: {childDetails?.recommendation || "N/A"}</p>
                    <p>Unusual Behaviours: {childDetails?.unsualBehaviours || "N/A"}</p>
                    <p>Vegetative Skills & OPEM: {childDetails?.vegetativeSkillsOPEM || "N/A"}</p>
                    <p>Handedness: {childDetails?.handedness || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

PatientProfileDetails.propTypes = {
    patient: PropTypes.object,
};

export default PatientProfileDetails;
