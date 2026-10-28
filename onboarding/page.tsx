'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUserRole } from '@/actions/update-role' // اضبط المسار حسب مشروعك

export default function SelectRolePage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [role,setRole]=useState("");
  if (!isLoaded) return <div>جاري التحميل...</div>
  if (!isSignedIn || !user) return <div>يرجى تسجيل الدخول أولاً</div>

  const handleSelectRole = async (role: 'business' | 'user') => {
    setLoading(true)
    try {
      try {
     
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user?.id,
          role: role,
          email: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName || user?.username || "Anonymous",
        }),
      });
  
     
     
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
      // نمرر user.id مباشرة هنا
      await updateUserRole(user.id, role)
      alert('تم حفظ الدور بنجاح!')
      if(role==='business'){
      router.push('/dash')
      router.refresh()}
      else{
         router.push('/services')
      router.refresh()
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'حدث خطأ ما')
    } finally {
      setLoading(false)
    }
  }
    
     const hS = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>اختر نوع الحساب</h2>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
        <button disabled={loading} onClick={() => handleSelectRole('business')}>
          حساب أعمال (Business)
        </button>
        <button disabled={loading} onClick={() => handleSelectRole('user')}>
          مستخدم عادي (User)
        </button>
      </div>
    </div>
  )
}