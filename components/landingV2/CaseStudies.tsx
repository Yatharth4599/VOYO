'use client'

import Image from 'next/image'

export default function CaseStudies() {
  return (
      <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
        <div className="w-[300px] mx-auto flex justify-center border border-gray-800 rounded-2xl">See The Results</div>
        <h2 className="relative w-fit mx-auto px-10 bg-gradient-to-r from-gray-200 to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 text-center font-bold mb-6">
          Case Studies
        </h2>

        <div className="w-full flex justify-center">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
            <div className="bg-[#16162c] rounded-lg p-6">
              <h3 className="mb-1 text-[20px] text-purple-200">
                How Delivery Hero saved <span className="font-bold text-white"> 200 hours each <br />  month</span> with a single ITOps workflow
              </h3>

              <div className="border-b mt-12 border-gray-700"></div>

              <p className="text-lg mb-4 mt-10">
                "We have seen drastic efficiency improvements since we started using n8n for user management. 
                It's incredibly powerful, but also simple to use."
              </p>
              <div className="flex gap-4 items-center mt-11">
                <Image
                  src="/account_circle.svg"
                  alt="account icon"
                  width={35}
                  height={35}
                />
                <div>
                  <p>Name</p>
                  <p className="text-sm">Position</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-violet-900 px-4 py-2 rounded font-bold transition mt-10">
                Read Case Study
              </button>
            </div>

            <div className="bg-[#16162c] rounded-lg p-6">
              <h3 className="mb-1 text-[20px] text-purple-200">
                How StepStone finishes <span className="font-bold text-white">2 weeks’ work in <br /> only 2 hours</span> with n8n workflows
              </h3>

              <div className="border-b mt-12 border-gray-700"></div>

              <p className="text-lg mb-4 mt-10">
                “We’ve sped up our integration of marketplace data sources by 25X. 
                It takes me 2 hours max to connect up APIs and transform the data we need. 
                You can’t do this that fast in code.”
              </p>
              <div className="flex gap-4 items-center">
                <Image
                  src="/account_circle.svg"
                  alt="account icon"
                  width={35}
                  height={35}
                />
                <div>
                  <p>Name</p>
                  <p className="text-sm">Position</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-violet-900 px-4 py-2 rounded font-bold transition mt-10">
                Read Case Study
              </button>
            </div>
          </div>
        </div>

      </section>
  )
}