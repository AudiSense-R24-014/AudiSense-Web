import { faListCheck, faChartLine } from "@fortawesome/free-solid-svg-icons";
import LandingRight from "../../assets/images/landing-right.png";
import LandingCards from "../../components/LandingCards";

const Landing = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 mb-6 md:mb-0">
                <h1 className="font-montserrat font-bold text-2xl md:text-4xl my-4">
                    Auditory Verbal Therapy & Patient Management
                </h1>
                <p className="font-montserrat text-base md:text-lg my-4">
                    Audisense is a platform that provides a patient management
                    tool and personalized gamification of auditory verbal
                    therapy.
                </p>
                <button
                    onClick={() => {
                        window.location = "./login";
                    }}
                    className="bg-audi-purple text-white text-sm font-semibold py-2 px-4 md:py-2.5 md:px-8 rounded-md hover:bg-purple-900 my-10"
                >
                    LOGIN
                </button>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 my-4">
                    <LandingCards
                        icon={faChartLine}
                        title="Progress Tracking"
                        description="Monitor and track your patients anywhere and anytime. Take full control over the patients therapy process."
                    />
                    <LandingCards
                        icon={faListCheck}
                        title="Task Suggestion"
                        description="Create and assign customizable tasks with just few clicks within seconds."
                    />
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center my-4">
                <img
                    src={LandingRight}
                    alt="Landing Right"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default Landing;
