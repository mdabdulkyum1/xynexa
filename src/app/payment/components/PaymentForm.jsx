'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from './CheckoutForm';




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function PaymentForm() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");
    const plan = searchParams.get("plan");
    

    console.log(plan, amount); 
    

   

    

    return (
        <div className="max-w-md mx-auto p-4">
            <Elements stripe={stripePromise}>
            
            <CheckoutForm amount={amount} plan={plan} />
            
            </Elements>
        </div>
    );
}


{/* <div className="border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 space-y-3">
                  
                    <div>
                        <h2 className="text-base font-semibold">1. Organization info</h2>
                        <p className="text-xs text-gray-500">
                            This information will be included on all billing invoices on your account.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="text-base font-medium">Organization name</label>
                            <input
                                {...register("organizationName", { required: "Organization name is required" })}
                                className="w-full mt-1 px-2 py-1 text-sm border border-purple-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                placeholder="Enter organization name"
                            />
                            {errors.organizationName && <p className="text-xs text-red-500">{errors.organizationName.message}</p>}
                        </div>
                        <div>
                            <label className="text-base font-medium">Plan</label>
                            <input
                                {...register("plan")}
                                className="w-full mt-1 px-2 py-1 text-sm border border-purple-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                defaultValue={plan}
                            />
                            
                        </div>

                        <div>
                            <label className="text-base font-medium">Country or region</label>
                            <div className="relative mt-1">
                                <select
                                    {...register("country", { required: "Country is required" })}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                                {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-base font-medium">Address line 1</label>
                            <input
                                {...register("addressLine1", { required: "Address line 1 is required" })}
                                className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                placeholder="Enter address"
                            />
                            {errors.addressLine1 && <p className="text-xs text-red-500">{errors.addressLine1.message}</p>}
                        </div>
                        <div className="divider"></div>
                        
                        <div>
                            <h2 className="text-base font-semibold">2. Payment method</h2>
                        </div>
                        <div>
                            <label className="text-base font-medium">Card number</label>
                            <div className="relative mt-1">
                                <input
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md pr-20 focus:outline-none focus:ring focus:ring-purple-400"
                                    placeholder="1234 1234 1234 1234"
                                />
                                <div className="absolute right-2 top-2 flex gap-1">
                                    <img
                                        src="https://i.ibb.co.com/RJpWngN/icons8-mastercard-48.png"
                                        alt="Mastercard Icon"
                                        className="h-4 w-4"
                                    />
                                    <img
                                        src="https://i.ibb.co.com/yB0mVvrB/card.png"
                                        alt="Visa Icon"
                                        className="h-4 w-4"
                                    />
                                    <img
                                        src="https://i.ibb.co.com/S7XRmNcS/icons8-american-express-squared-48.png"
                                        alt="American Express Icon"
                                        className="h-4 w-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-base font-medium">Expiration date</label>
                                <input
                                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                    placeholder="MM / YY"
                                />
                            </div>
                            <div>
                                <label className="text-base font-medium">Security code</label>
                                <input
                                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-400"
                                    placeholder="CVC"
                                />
                            </div>
                        </div>

                       
                        <button className="w-full mt-2  md:mt-4 bg-purple-800 hover:bg-purple-800 text-white text-sm font-medium px-3 py-1.5 rounded-md transition duration-200">
                            Purchase Slack Pro
                        </button>

                       
                        <p className="text-[10px] text-gray-500 text-center mt-2">
                            You can cancel your plan at any time. Purchases made by credit card can’t be refunded, although your credit can be transferred to another account.
                        </p>
                        <p className="text-[10px] text-gray-500 text-center">
                            By submitting this form, you confirm that you agree to our{" "}
                            <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
                            <a href="#" className="text-blue-600">Privacy Policy</a>.
                        </p>
                    </form>
                </div>
            </div> */}
