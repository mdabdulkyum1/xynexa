// import Loading from '@/components/loading/Loading';
// import Faq from './components/home/Faq/Faq';
// import Features from './components/home/Features';
import Hero from './components/home/Hero/Hero';
import WorkFlow from './landingPage/WorkFlow';
import EssyCollab from './landingPage/EssyCollab';
import MuchMore from './landingPage/MuchMore';
// import LeastStressed from './components/home/Hero/LeastStressed';
// import Pricing from './components/home/Pricing/Pricing';
// import Reviews from './components/home/Reviews/Reviews';
// import Service from './components/home/Services/Service';
// import TrackProgress from './components/home/TrackProgress/TrackProgress';
// import Welcome from './components/home/WellcomeMsg/Welcome';
import OthersFeatures from './landingPage/OthersFeatures';
import SimpleAnlytics from './landingPage/SimpleAnlytics';
import FavriteApps from './landingPage/FavriteApps';
import Today from './landingPage/Today';
import Pricing from './landingPage/Pricing';
import Testimonials from './landingPage/Testimonials';
import BlogSection from './landingPage/BlogSection';
import FAQSection from './landingPage/FAQSection';

export default function Home() {
  return (
    <>
    {/* <Welcome></Welcome> */}
      <Hero></Hero>

     
    <OthersFeatures></OthersFeatures>
     <MuchMore></MuchMore>
     <SimpleAnlytics></SimpleAnlytics>
     <EssyCollab></EssyCollab>
     <WorkFlow></WorkFlow>
     <FavriteApps></FavriteApps>
     <Pricing></Pricing>
     <Testimonials></Testimonials>
     <BlogSection></BlogSection>
     <FAQSection></FAQSection>
     <Today></Today>

      
      {/* <LeastStressed></LeastStressed> */}
      {/* <Features></Features> */}
      {/* <Service></Service> */}
      {/* <Pricing></Pricing> */}
      {/* <Reviews></Reviews> */}
      {/* <Faq></Faq> */}
      {/* <TrackProgress></TrackProgress> */}
    </>
  );
}
