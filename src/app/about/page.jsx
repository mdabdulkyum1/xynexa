import AboutBanner from "./components/AboutBanner";
import AboutHelp from "./components/AboutHelp";
import AboutValue from "./components/AboutValue";
import ClientSays from "./components/ClientSays";
import AboutOurTeam from "./components/AboutOurTeam";
import Timeline from "./components/Timeline";


const About = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <AboutHelp></AboutHelp>
            <AboutValue></AboutValue>
            <ClientSays></ClientSays>
            <AboutOurTeam></AboutOurTeam>
            <Timeline></Timeline>
        </div>
    );
};

export default About;