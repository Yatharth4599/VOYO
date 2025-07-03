'use client'

import Image from 'next/image'

export default function Performance() {
  return (
    <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
      <div>
        <div className="flex justify-center">
          <div className="mt-7 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 dark:from-purple-500 dark:via-pink-500 dark:to-red-500 p-[2px] rounded-2xl w-fit shadow-lg">
            <div className="bg-white dark:bg-[#16162c] w-[200px] flex justify-center border-none rounded-2xl text-black dark:text-white">
              Enterprise-ready
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full px-10 justify-evenly items-start">
          <div className="max-w-[700px] mt-3">
            <h1 className="relative bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] font-bold">
              Secure. Reliable.<br />Collaborative.
            </h1>
            <p className="mt-4 text-black dark:text-white">
              Remove inefficiencies across your org by rolling out automation as reliably as <br /> you deploy code. 
              Run n8n air-gapped on your servers or on our secure <br /> cloud-based solution.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
                Explore n8n for enterprise
              </button>
              <button className="border border-gray-500 dark:border-gray-400 text-black dark:text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
                Talk to sales
              </button>
            </div>

            <table className="mt-10 w-full table-auto">
              <tbody>
                <tr>
                  <td className="font-bold pr-4 align-top text-black dark:text-white">Security</td>
                  <td className="text-amber-600 dark:text-purple-200">
                    Fully on-prem option, SSO SAML, and LDAP, <br />encrypted secret stores, version control, <br /> advanced RBAC permissions.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 align-top text-black dark:text-white">Performance</td>
                  <td className="text-amber-600 dark:text-purple-200">
                    Audit logs & log streaming to 3rd party, <br />workflow history, custom variables, external <br /> storage.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 align-top text-black dark:text-white">Collaboration</td>
                  <td className="text-amber-600 dark:text-purple-200">
                    Git Control, isolated environments, multi-user  <br />workflows.
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-b mt-12 border-gray-300 dark:border-gray-700"></div>
          </div>

          <div className="mt-7 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 dark:from-purple-500 dark:via-pink-500 dark:to-red-500 p-[2px] rounded-md w-fit shadow-lg">
            <div className="bg-white dark:bg-[#16162c] w-fit h-full p-10 rounded-md text-black dark:text-white">
              <p className="mt-12">
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
                <div className="mt-4">
                  <p>Name</p>
                  <p className="text-sm">Position</p>
                </div>
              </div>
              <button className="text-sm mt-4 text-blue-600 dark:text-pink-400 underline hover:text-amber-500 dark:hover:text-pink-500 transition cursor-pointer">
                See the case
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
