'use client'

import Image from 'next/image'

export default function Performance() {
  return (
     <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
      <div>
         <div className="flex justify-center">
          <div className="mt-7 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[1px] rounded-2xl w-fit shadow-lg">
            <div className="bg-[#16162c] w-[200px] flex justify-center border border-gray-800 rounded-2xl text-white py-2">
              Enterprise-ready
            </div>
          </div>
        </div>

          <div className="flex flex-col md:flex-row w-full px-10 justify-evenly items-start">

            <div className="max-w-[700px] mt-3">
              <h1 className="relative bg-gradient-to-r from-gray-200 to-violet-800 bg-clip-text text-transparent text-[50px] font-bold">
                Secure. Reliable.<br />Collaborative.
              </h1>
              <p>
                Remove inefficiencies across your org by rolling out automation as reliably as <br /> you deploy code. 
                Run n8n air-gapped on your servers or on our secure <br /> cloud-based solution.
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
                  Explore n8n for enterprise
                </button>
                <button className="border border-gray-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
                  Talk to sales
                </button>
              </div>

              <table className="mt-10 w-full table-auto">
                <tbody>
                  <tr>
                    <td className="font-bold pr-4 align-top">Security</td>
                    <td className="text-purple-200">
                      Fully on-prem option, SSO SAML, and LDAP, <br />encrypted secret stores, version control, <br /> advanced RBAC permissions.
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 align-top">Performance</td>
                    <td className="text-purple-200">
                      Audit logs & log streaming to 3rd party, <br />workflow history, custom variables, external <br /> storage.
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 align-top">Collaboration</td>
                    <td className="text-purple-200">
                      Git Control, isolated environments, multi-user  <br />workflows.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="border-b mt-12 border-gray-700"></div>
            </div>

            <div className="mt-7 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px] rounded-md w-fit shadow-lg">
              <div className="bg-[#16162c] w-fit h-full p-10 rounded-md">
                <p className="mt-12 text-white">
                  "The idea is that everybody in the <br />organization can use n8n to manage data 
                  <br />retrieval or data transformation."
                </p>
                <div className="flex gap-4 items-center mt-11">
                  <Image
                    src="/account_circle.svg"
                    alt="account icon"
                    width={35}
                    height={35}
                  />
                  <div className="mt-4 text-white">
                    <p>Name</p>
                    <p className="text-sm">Position</p>
                  </div>
                </div>
                <button className="text-sm mt-4 text-white underline hover:text-pink-400 transition">
                  See the case
                </button>
              </div>
            </div>
          </div>


      </div>
     </section>
  )
}