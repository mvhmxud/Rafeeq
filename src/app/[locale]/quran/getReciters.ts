export async function getReciters() {
  try {
    const res = await fetch(
      "https://api.quran.com/api/v4/resources/recitations?language=ar",
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch reciters");

    const data = await res.json();
    return data.recitations || [];
  } catch (error) {
    console.error("Error fetching reciters:", error);
    return [];
  }
}
