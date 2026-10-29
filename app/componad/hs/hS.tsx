"use client"

import { useUser } from "@clerk/nextjs"
import { clerkClient } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default  function OnboardingPage() {
    const [role,setRole]=useState("");
    const [loading,setLoading]=useState(false);
    const {user,isLoaded}=useUser();
    const router=useRouter();
   const hS = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  try {
   
    const res = await fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clerkId: user?.id,
        role: role,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    if (res.ok) {

      router.push('/services/dashboardsrv'); 
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
    return(<>
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">اختر نوع حسابك</h2>
      <form onSubmit={hS} className="space-y-4">
        <div>
          <label className="block mb-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="ml-2"
            />
            حساب شخصي (عادي)
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              name="role"
              value="business"
              checked={role === 'business'}
              onChange={() => setRole('business')}
              className="ml-2"
            />
            حساب تجاري
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'جاري الحفظ...' : 'متابعة'}
        </button>
      </form>
    </div>   
    </>)
}