export default async function handler(req, res) {

  const { message, key } = req.query;

  if (key !== "RAWAT") {
    return res.status(403).json({
      reply: "Invalid Key"
    });
  }

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAinQScQQ-6U84A08jwIOyaH3sNP2CAjPs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are RAWAT AI.\nUser: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply";

    res.status(200).json({
      reply: reply + "\\n\\n🤖 Powered By RAWAT"
    });

  } catch (e) {

    res.status(500).json({
      reply: e.toString()
    });

  }
}