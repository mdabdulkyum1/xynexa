
import PackageFeature from './components/PackageFeature';
import PricingCards from './components/PricingCards';
import PricingFaq from './components/PricingFaq';
import Productivity from './components/Productivity';



const Pricing = () => {
  return (
    <div className='mt-20 container mx-auto'>
      <PricingCards></PricingCards>
      <PackageFeature></PackageFeature>
      <Productivity></Productivity>
      <PricingFaq></PricingFaq>
    </div>
  );

}
export default Pricing;