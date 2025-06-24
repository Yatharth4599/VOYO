'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CreateBatchCall() {
  const [batchName, setBatchName] = useState('Untitled Batch');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agent, setAgent] = useState('');
  const [timingOption, setTimingOption] = useState<'immediate' | 'scheduled'>('immediate');
  const [scheduledDateTime, setScheduledDateTime] = useState('');

  const [recipients, setRecipients] = useState([
    { name: 'Nev', phone_number: '+3838101429', language: 'en' },
    { name: 'Antoni', phone_number: '+3838101429', language: 'pl' },
    { name: 'Thor', phone_number: '+3838101429', language: 'de' },
  ]);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-white">
        <a
          href="/outbound"
          className="text-gray-500 hover:text-black transition-colors text-sm flex items-center"
        >
          ← Back
        </a>
        <h2 className="text-xl font-semibold">Create a batch call</h2>
      </div>

      <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel */}
        <div className="w-[520px] border-r bg-white flex flex-col relative">
          {/* Scrollable Content */}
          <div className="px-6 py-1 overflow-y-auto flex-1">
            {/* Batch Name */}
            <div className="mb-4">
              <label className="text-sm font-medium">Batch name</label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <select
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm appearance-none"
                >
                  <option value="">Select a phone number</option>
                  <option value="+1234567890">+1234567890</option>
                  <option value="+1987654321">+1987654321</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Agent */}
            <div className="mb-4">
              <label className="text-sm font-medium">Select Agent</label>
              <div className="relative">
                <select
                  value={agent}
                  onChange={(e) => setAgent(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm appearance-none"
                >
                  <option value="">Select an agent</option>
                  <option value="Agent A">Agent A</option>
                  <option value="Agent B">Agent B</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Recipients Upload */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[13px]">Recipients</label>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-gray-500">25.0 MB</span>
                  <div className="border rounded-full px-2 py-[2px]">CSV</div>
                  <div className="border rounded-full px-2 py-[2px]">XLS</div>
                </div>
              </div>

              <div className="border rounded-md p-3 mt-1 text-sm">
                <div className="flex justify-center mb-2 p-3">
                  <button className="px-4 py-2 border rounded text-sm cursor-pointer">Upload</button>
                </div>
                <div className="flex border-t justify-between">
                  <div className="max-w-[200px]">
                    <p className="text-gray-500 text-xs mb-2">
                      The <span className="font-semibold">phone_number</span> column is required. You can also pass
                      certain <span className="font-semibold">overrides</span>. Any other columns will be passed as
                      dynamic variables.
                    </p>
                  </div>

                  <table className="text-xs w-full table-auto border-separate border-spacing-x-4">
                    <thead>
                      <tr>
                        <th className="text-left py-1">name</th>
                        <th className="text-left py-1">phone_number</th>
                        <th className="text-left py-1">language</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipients.map((r, i) => (
                        <tr key={i}>
                          <td className="py-1">{r.name}</td>
                          <td className="py-1">{r.phone_number}</td>
                          <td className="py-1">{r.language}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="mt-2 px-3 py-1 border rounded text-xs cursor-pointer">⬇ Template</button>
              </div>
            </div>

            {/* Timing */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Timing</label>
              <div className="flex flex-col gap-2">
                <div className="flex border p-2 rounded-xl gap-2">
                  <button
                    onClick={() => setTimingOption('immediate')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      timingOption === 'immediate'
                        ? 'bg-black text-white rounded-xl'
                        : 'bg-white text-black rounded-xl'
                    }`}
                  >
                    Send immediately
                  </button>
                  <button
                    onClick={() => setTimingOption('scheduled')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      timingOption === 'scheduled'
                        ? 'bg-black text-white rounded-xl'
                        : 'bg-white text-black rounded-xl'
                    }`}
                  >
                    Schedule for later
                  </button>
                </div>

                {timingOption === 'scheduled' && (
                  <div className="w-full border rounded-md shadow p-4 mt-2">
                    <label className="block text-sm font-medium mb-1">Select Date & Time</label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="w-full border px-3 py-2 rounded-md text-sm"
                    />
                    {scheduledDateTime && (
                      <p className="text-xs text-gray-500 mt-2">
                        Scheduled for:{' '}
                        <span className="font-medium">{new Date(scheduledDateTime).toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Footer Section */}
          <div className="border-t border-gray-300 px-6 py-4 sticky bottom-0 bg-white">
            <div className="flex flex-row-reverse gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
                Submit a Batch Call
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-md text-sm text-gray-400 cursor-not-allowed">
                Test call
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-medium">No recipients yet</p>
            <p className="text-xs mt-1">Upload a CSV to start adding recipients to this batch call</p>
          </div>
        </div>
      </div>
    </div>
  );
}
