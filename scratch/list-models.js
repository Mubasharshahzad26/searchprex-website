require('dotenv').config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  if (data.models) {
    console.log(data.models.map(m => m.name).join("\n"));
  } else {
    console.log(data);
  }
}
run();
