"use server";

export async function loginUser(clerkId) {
    
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/loginUser`, {
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