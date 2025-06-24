'use client';

import NavigationLayout from "@/components/NavigationLayout";
import { useRouter } from "next/navigation"; // ✅ Correct import

export default function OutboundPage() {
  const router = useRouter(); // ✅ Hook to get the router

  return (
    <NavigationLayout
      title="Batch Calling"
      currentPage="/outbound"
      showCreateButton={true}
      onCreateClick={() => router.push('/create-batch-call')}
      createButtonText="Create a batch call"
    >
      <div className="flex justify-center">
        <div className="w-full max-w-7xl mt-8">
          <input
            type="text"
            placeholder="Search Batch Calls....."
            className="border w-full rounded-[10px] px-4 py-2 border-gray-400 hover:border-black"
          />

          <div className="mt-6 border rounded-[15px] p-7 bg-stone-100 text-center">
            <img
              src="phone_forwarded.svg"
              alt="No calls"
              className="mx-auto mb-4 bg-white p-2 border rounded-[5px]"
            />
            <p className="font-bold">No batch calls found</p>
            <p className="text-gray-500">
              You have not created any batch calls yet.
            </p>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
