"use server";

export async function saveUser(user) {
  try {
    const res = await fetch("http://localhost:5000/api/register", {
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
