import BrandSection from "./components/BrandSection";
import ContactBanner from "./components/ContactBanner";
import ContactOptions from "./components/ContactOptions";
import FAQSection from "./components/FAQSection";
import InsightsSection from "./components/InsightsSection";

const Contact = () => {
    return (
        <div>
            <ContactBanner/>
            <ContactOptions/>
            <FAQSection/>
            <BrandSection/>
            <InsightsSection/>
        </div>
    );
};

export default Contact;