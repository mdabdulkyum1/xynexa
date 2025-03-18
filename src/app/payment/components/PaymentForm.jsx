export default function PaymentForm() {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 space-y-4">
            {/* Organization Info */}
            <div>
              <h2 className="text-base font-semibold">1. Organization info</h2>
              <p className="text-xs text-gray-500">
                This information will be included on all billing invoices on your account.
              </p>
            </div>
            <div>
              <label className="text-xs font-medium">Organization name</label>
              <input
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Country or region</label>
              <div className="relative mt-1">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value="Bangladesh"
                  readOnly
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="Dropdown Icon"
                  className="absolute right-2 top-2 h-4 w-4 text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Address line 1</label>
              <input
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>
  
            {/* Payment Method */}
            <div>
              <h2 className="text-base font-semibold">2. Payment method</h2>
            </div>
            <div>
              <label className="text-xs font-medium">Card number</label>
              <div className="relative mt-1">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 1234 1234 1234"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                  alt="Credit Card Icon"
                  className="absolute right-2 top-2 h-4 w-4 text-gray-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">Expiration date</label>
                <input
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM / YY"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Security code</label>
                <input
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
            </div>
  
            {/* Purchase Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition duration-200">
              Purchase Slack Pro
            </button>
  
            {/* Terms & Policy */}
            <p className="text-[10px] text-gray-500 text-center mt-2">
              You can cancel your plan at any time. Purchases made by credit card can’t be refunded, although your credit can be transferred to another account.
            </p>
            <p className="text-[10px] text-gray-500 text-center">
              By submitting this form, you confirm that you agree to our{" "}
              <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }