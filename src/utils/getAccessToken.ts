
export const getAccessToken = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken
  if (typeof window !== "undefined") {
    // Only run this code on the client
    const accessToken = localStorage.getItem("token");
    return accessToken
  } else {
    return null; // Handle the server-side case
  }
}

export const setAuthToken = (key: string, value: string) => {
  localStorage.set({ [key]: value });
}