import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { message, customPrompt } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  // Use the custom prompt if provided, otherwise use the user's message
  const prompt = customPrompt || message;

  const response = await fetch(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150,
      }),
    },
  );

  const data = await response.json();

  res.status(200).json({ response: data.choices[0].text.trim() });
}
