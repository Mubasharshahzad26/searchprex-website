const url = "https://www.google.com/goto?url=CAESVghrOzAvU20h3S0Ql8FypE8MvNr2aHU3nsl8hGsh8Uuu60aVR0mR9PQUqjLu2p1-aQS8wCkAwNW2SD-ijKvgGaWsd57YSl5kPY4JzHWc1XlZdLts0qFo";

async function run() {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      redirect: 'manual'
    });
    console.log("Status:", res.status);
    console.log("Location:", res.headers.get("location"));
    
    if (res.status === 200) {
      console.log("Body:", (await res.text()).substring(0, 300));
    }
  } catch(e) {
    console.error(e);
  }
}
run();
