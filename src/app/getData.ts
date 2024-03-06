export async function getData() {
  const url: any = process.env.DB_API_URL;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
