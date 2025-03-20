"use server";

export async function saveUser(user) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (error) {
    console.error("Error saving user:", error);
    return { error: "Failed to save user" };
  }
}
