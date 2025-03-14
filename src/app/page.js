import Faq from './components/home/Faq/Faq';
import Features from './components/home/Features';
import Hero from './components/home/Hero/Hero';
import LeastStressed from './components/home/Hero/LeastStressed';
import Pricing from './components/home/Pricing/Pricing';
import Reviews from './components/home/Reviews/Reviews';
import Service from './components/home/Services/Service';

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <LeastStressed></LeastStressed>
      <Features></Features>
      <Service></Service>
      <Pricing></Pricing>
      <Reviews></Reviews>
      <Faq></Faq>
    </>
  );
}
