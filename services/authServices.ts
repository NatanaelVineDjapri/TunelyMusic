export const registerUser = async (username: string, password: string) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // ambil pesan error dari API
    throw new Error(data.error || "Register failed");
  }

  return data; 
};
;

export const loginUser = async (username: string, password: string) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Login failed");
    }

    return data; 
  } catch (err: any) {
    throw new Error(err.message || "Login failed");
  }
};
