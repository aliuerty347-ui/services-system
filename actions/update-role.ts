'use server'

import { clerkClient } from '@clerk/nextjs/server'

export async function updateUserRole(userId: string, role: 'business' | 'user') {
  // التحقق من وجود ID
  if (!userId) {
    throw new Error('لم يتم العثور على معرّف المستخدم')
  }

  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: role,
    },
  })

  return { success: true }
}