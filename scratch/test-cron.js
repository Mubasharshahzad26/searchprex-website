const url = "https://searchprex.com/api/sdr/trigger-cron"; // or we can hit the actual site

async function run() {
  try {
    const res = await fetch("https://searchprex.com/api/sdr/trigger-cron", {
      method: "POST"
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text);
  } catch (e) {
    console.error(e);
  }
}
run();
