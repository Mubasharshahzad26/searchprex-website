# MSO Autopilot on Searchprex — Setup

Searchprex ab MSO Autopilot chala sakta hai, paid single Gemini key ke baghair.
30 free keys ka rotation pool use hota hai, aur daily limit dono engines
(NicheSEO Pro + Searchprex) ke liye **combined 1000/day** hai.

---

## 1. Kya badla

| Cheez | Pehle | Ab |
|---|---|---|
| Gemini key | 1 paid key (`GEMINI_API_KEY`) | 30 free keys, auto-rotating pool |
| Key khatam hone par | Poora run fail | Us key ko rotation se nikal kar agli key |
| Daily limit | Searchprex par koi limit nahi thi | 1000/day, dono engines combined |
| Limit kahan set hoti hai | Har engine me alag | Ek jagah: Neon `mso_cloud_config` |
| Scheduling | Vercel cron (din me 1 baar) | cron-jobs.org (har 5 min) |

Naye files:

- `lib/gemini-pool.ts` — 30-key rotator
- `lib/autopilot/mso-daily-limit.ts` — shared daily cap
- `app/api/cron/mso-autopilot/route.ts` — cron-jobs.org endpoint
- `app/api/mso/status/route.ts` — pool health + quota + limit set
- `scripts/enable-mso-autopilot.ts` — autopilot ko live karne ka script

---

## 2. Keys kahan se aati hain

Pool teen jagah dekhta hai, isi tarteeb se:

1. `GEMINI_API_KEYS` env var — comma-separated
2. Neon `mso_cloud_config` table, row `gemini_api_keys` ← **abhi yehi use ho raha hai (30 keys)**
3. `GEMINI_API_KEY` — purani single key, sirf fallback

Neon wahi database hai jo NicheSEO Pro padhta hai, isliye **ek jagah key add karne
se dono engines ko mil jaati hai**. Cache 5 minute ka hai — nayi key 5 min me live.

Nayi keys add karni hon:

```bash
npx tsx scripts/sync-30-gemini-keys.ts
```

(yeh script NicheSEO Pro repo me hai)

---

## 3. Keys khatam to nahi hongi?

Nahi. Hisaab:

- Free tier `gemini-flash-lite-latest`: ~1,000 requests/day per key
- 30 keys × 1,000 = **~30,000 requests/day** capacity
- 1,000 pages ko chahiye ~1,000–1,300 requests/day

Yaani ~4% capacity use hogi. Free tier agar 250 RPD tak bhi gir jaye to bhi
7,500/day capacity hai — phir bhi 1000 pages se 7x zyada.

Aur agar koi key phir bhi quota hit kar de: rotator us key ko **Pacific midnight
tak** rotation se nikal deta hai (Google ka free quota wahan reset hota hai) aur
agli key par chala jaata hai. Run rukta nahi.

---

## 4. cron-jobs.org — haan, enable karein

**Wajah keys nahi hai — Vercel cron hai.** `vercel.json` ka cron din me sirf ek
baar chalta hai (`0 0 * * *`). Ek call = 8 products. Yaani Vercel akela din me
8 pages karega, 1000 nahi.

### Setup

**Endpoint:**

```
https://www.searchprex.com/api/cron/mso-autopilot?key=<CRON_SECRET>
```

`<CRON_SECRET>` wahi hai jo `.env.local` me pehle se hai.

**cron-jobs.org par:**

| Setting | Value |
|---|---|
| Title | `MSO Autopilot` |
| URL | upar wala endpoint |
| Schedule | Every 5 minutes |
| Request method | GET |
| Save responses in job history | On (debugging ke liye) |
| Treat redirects as success | No |

Header wala tareeqa bhi chalta hai agar aap query string me secret nahi rakhna
chahte: `Authorization: Bearer <CRON_SECRET>`.

### Endpoint foran jawab kyun deta hai

cron-jobs.org har request ko **30 second** deta hai. Hamara batch ~150 second
leta hai. Agar endpoint kaam khatam hone ka intezaar karta, to har run job
history me "timeout" (red) dikhta — aur jo history hamesha red ho, wo asli
kharabi ke waqt kuch nahi batati.

Isliye endpoint `202 started` foran wapas karta hai aur kaam Next.js ke
`after()` me chalta rehta hai. cron-jobs.org ko 1 second me jawab mil jaata hai,
aur Vercel function apne 300s budget me batch poora karta hai.

Progress dekhne ke liye job history nahi, `/api/mso/status` dekhein.

curl se numbers chahiye hon to `&wait=1` laga dein — phir endpoint rukta hai aur
poore stats deta hai:

```bash
curl "https://www.searchprex.com/api/cron/mso-autopilot?key=$CRON_SECRET&wait=1"
```

### Har 5 minute kyun mehfooz hai

- **Database lock** (`lib/autopilot/mso-lock.ts`): Vercel do calls ko do alag
  instances par bhej sakta hai, aur har instance ki apni memory hoti hai — sirf
  ek in-process flag dono ko nahi rok sakta. Lock dono engines ke sanjhe Neon DB
  me hai, aur khud expire hota hai (290s) taake mara hua run autopilot ko
  hamesha ke liye band na kar de. Test kiya gaya: 3 parallel attempts, sirf ek
  kamyab.
- Batch chal raha ho to agla call `already_running` return karta hai
- Cap 1000 par pohanchne par `daily_limit_reached` — uske baad calls sasti hain

Capacity: 288 calls/day × 8 = 2,304 — cap 1000 par khud ruk jayega.

---

## 5. Autopilot ko live karna

```bash
npx tsx scripts/enable-mso-autopilot.ts
```

Yeh script:

1. MSO client aur WordPress connection verify karta hai
2. Key pool check karta hai (30 keys mil rahi hain ya nahi)
3. Shared daily limit 1000 set karta hai
4. `AutopilotConfig` ko `enabled=true, dryRunMode=false` karta hai
5. Aaj ka quota print karta hai

Pehle test karna ho to dry-run me arm karein — kuch publish nahi hoga:

```bash
npx tsx scripts/enable-mso-autopilot.ts 1000 --dry
```

Live karne ke liye `--dry` ke baghair dobara chala dein.

---

## 6. Check karna ke sab theek chal raha hai

```bash
curl "https://www.searchprex.com/api/mso/status?key=$CRON_SECRET"
```

Jawab me:

- `keyPool.totalKeys` — 30 hona chahiye
- `keyPool.activeKeys` — kitni keys abhi kaam kar rahi hain
- `keyPool.exhaustedKeys` — kitni aaj ke liye khatam (0 hi rehni chahiye)
- `quota.publishedToday` / `quota.limit` — dono engines ka combined count
- `autopilot.enabled` / `autopilot.dryRunMode`

Limit badalni ho (dono engines par ek saath lag jayegi):

```bash
curl -X POST "https://www.searchprex.com/api/mso/status?key=$CRON_SECRET" \
  -H "content-type: application/json" \
  -d '{"limit": 1200}'
```

---

## 7. Outbound link policy (dono engines par aik jaisi)

Pehle dono engines ke rules ulat the: Searchprex ka scorer external link
**zaroori** samajhta tha (aur prompt KnifeCenter/Bladeforums tajweez karta tha),
jabke NicheSEO har external link par **−50** lagata tha. KnifeCenter aapka
seedha competitor hai — yaani product pages competitor ko link bhej rahe thay.

Ab dono par aik hi rule hai:

| Link | Nateeja |
|---|---|
| Koi external link nahi | ✅ Theek (zaroori nahi hai) |
| Wikipedia (steel grade, lock type) | ✅ Allowed |
| Product ki apni manufacturer site | ✅ Allowed |
| KnifeCenter, BladeHQ, Bladeforums, Amazon, eBay | ❌ −50, page fail |

Allowlist do jagah hai aur **dono ko saath badalna hai**:

- `lib/autopilot/scoring.ts` → `ALLOWED_EXTERNAL_HOSTS`
- NicheSEO Pro: `server/mso-worker.ts` → `ALLOWED_EXTERNAL_HOSTS`

Naya brand stock karein to uska domain dono jagah add kar dein.

---

## 8. Daily cap kaam kaise karta hai

Dono engines ek hi product queue par kaam karte hain — Searchprex aage se
(id 1, 2, 3…), NicheSEO Pro peeche se (id 36779, 36778…) — aur dono apna publish
kiya hua page usi Neon `AutopilotPage` table me likhte hain.

Isliye cap **wahan se count hota hai**, kisi engine ke apne run stats se nahi.
Agar dono alag alag "1000 per day" lagate, to milkar 2000 publish kar dete.

Din PKT (UTC+5) ke hisaab se chalta hai, kyunki daily summary aur Google Sheet
isi clock par report karte hain.
