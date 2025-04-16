"use server";

export async function offlineUser(clerkId) {
    
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/offlineUser`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clerkId),
    });

    return await res.json();
  } catch (error) {
    console.error("Error saving user:", error);
    return { error: "Failed to save user" };
  }
}