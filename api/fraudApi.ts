const API_URL = "http://192.168.1.73:8081"; 

export async function checkFraudText(text: string) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text}),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  return await response.json();
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function fetchSomething() {
  const response = await fetch(`${apiUrl}/endpoint`);
  const data = await response.json();
  return data;
}