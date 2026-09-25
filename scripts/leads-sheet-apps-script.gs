/**
 * ═══════════════════════════════════════════════════════════════
 *  SearchPrex — Lead capture into a Google Sheet
 * ═══════════════════════════════════════════════════════════════
 *
 * WHY THIS EXISTS
 *
 * Lead capture on searchprex.com was dead in production. On 25 September 2026
 * both endpoints returned 500:
 *
 *   POST /api/send-audit  ->  {"error":"Invalid API key"}      (Supabase anon key)
 *   POST /api/leads       ->  {"error":"Server not configured"} (no service-role key)
 *
 * /api/send-audit is where every primary CTA on the site points. So every
 * person who filled the form got an error, and before the res.ok fix in
 * FreeAuditClient they were shown "Audit Request Received!" while nothing was
 * saved anywhere. Zero leads had ever reached storage.
 *
 * A Google Sheet replaces that because it removes the failure mode: there is no
 * API key here to expire, and the owner can read the leads without logging in
 * to a dashboard. This script also sends the alert email itself, so the row and
 * the notification share one dependency instead of two — the whole point being
 * that there is one less thing that can quietly stop working.
 *
 * ───────────────────────────────────────────────────────────────
 * SETUP (once, about five minutes)
 * ───────────────────────────────────────────────────────────────
 *
 *  1. Make a new Google Sheet. Copy its ID from the URL:
 *       docs.google.com/spreadsheets/d/<THIS PART>/edit
 *
 *  2. In that Sheet: Extensions -> Apps Script. Delete whatever is there,
 *     paste this whole file.
 *
 *  3. Fill in the two values in CONFIG below:
 *       SHARED_SECRET  - invent a long random string. The same string goes in
 *                        Vercel as LEADS_SHEET_SECRET. It stops anyone who
 *                        finds the URL from writing junk rows.
 *       NOTIFY_EMAIL   - where the "new lead" alert goes.
 *
 *  4. Deploy -> New deployment -> type "Web app"
 *       Execute as:      Me
 *       Who has access:  Anyone          <-- must be "Anyone", not "Anyone with
 *                                            a Google account". The website is
 *                                            not signed in to Google; the
 *                                            SHARED_SECRET is what protects it.
 *     Deploy, authorise when asked, copy the /exec URL.
 *
 *  5. In Vercel -> Project -> Settings -> Environment Variables, add:
 *       LEADS_SHEET_WEBHOOK_URL = the /exec URL from step 4
 *       LEADS_SHEET_SECRET      = the same string as SHARED_SECRET
 *     Then redeploy.
 *
 *  6. Check it: open https://www.searchprex.com/api/send-audit in a browser.
 *     It reports whether the webhook is configured, without revealing anything.
 *     Then submit the real form once and confirm the row appears.
 *
 * IMPORTANT: every time you edit this script you must Deploy -> Manage
 * deployments -> edit -> New version. Saving alone does not update the live URL.
 */

/**
 * Defaults. The two sensitive values are deliberately NOT real here.
 *
 * searchprex-website is a public repository, so this file is public. A shared
 * secret committed to it is not a secret, and a personal email address in it is
 * food for scrapers. Both are read from Script Properties instead — set inside
 * the Apps Script editor, which is not the repo:
 *
 *   Apps Script -> Project Settings (gear) -> Script Properties -> Add
 *       SHARED_SECRET   the long random string (same value goes in Vercel)
 *       NOTIFY_EMAIL    comma-separated addresses for the alert
 *
 * If a property is absent the value below is used, so the script still runs
 * with just the defaults — it simply cannot be given the private ones.
 *
 * No SPREADSHEET_ID: this script is bound to the sheet it lives in, so
 * getActiveSpreadsheet() finds it. That also keeps the sheet's ID out of the
 * public repo.
 */
var CONFIG = {
  // Bumped whenever this file changes in a way that matters, and returned by
  // doGet. Without it there is no way to tell which code a deployment is
  // actually running: "I redeployed" and "the new code is live" are different
  // claims, and a Save without Deploy -> Manage deployments -> New version
  // looks exactly like a successful deploy from the editor. Two rounds of
  // inferring the answer from row counts is what put this here.
  //
  //   v4  doGet(?requestId=) confirms whether a write landed
  //   v3  requestId de-duplication via CacheService
  //   v2  Phone column
  //   v1  first working version
  SCRIPT_VERSION: 'v4',

  SHARED_SECRET: 'CHANGE_ME_TO_A_LONG_RANDOM_STRING',

  // Public address only. Add the private one as a Script Property.
  NOTIFY_EMAIL: 'contact@searchprex.com',

  // Tab name inside the spreadsheet. Created automatically if missing.
  SHEET_NAME: 'Leads',

  // Set to false if the email alerts become noise. The row is still written.
  SEND_EMAIL: true,
};

/** A Script Property if it is set, otherwise the CONFIG default. */
function setting_(key) {
  try {
    var value = PropertiesService.getScriptProperties().getProperty(key);
    if (value && String(value).trim()) return String(value).trim();
  } catch (err) {
    Logger.log('script properties unavailable: ' + err);
  }
  return CONFIG[key];
}

var HEADERS = [
  'Received (PKT)',
  'Name',
  'Email',
  'Website',
  'Phone',
  'Business type',
  'Message',
  'Source page',
  'UTM source',
  'UTM campaign',
  'Referrer',
];

/**
 * The spreadsheet to write into.
 *
 * Bound scripts (made with Extensions -> Apps Script from inside a sheet) get
 * it from getActiveSpreadsheet(). A standalone script made at script.google.com
 * does not — there getActiveSpreadsheet() returns null and every write fails
 * with a confusing error. So a SPREADSHEET_ID Script Property is honoured as a
 * fallback, which also keeps the sheet's id out of this public repo.
 */
function getSpreadsheet_() {
  var id = null;
  try {
    id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  } catch (err) {
    Logger.log('script properties unavailable: ' + err);
  }
  if (id && String(id).trim()) return SpreadsheetApp.openById(String(id).trim());

  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;

  throw new Error(
    'No spreadsheet. This script is not bound to a sheet, so add a Script ' +
    'Property named SPREADSHEET_ID with the id from the sheet URL.'
  );
}

/** The Leads tab, created with a frozen, formatted header row if absent. */
function getLeadsSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // Write the header if the first row is empty. Checked every time rather than
  // only at creation, so a sheet whose header was deleted repairs itself
  // instead of silently writing data under no columns.
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1a7d59')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150); // timestamp
    sheet.setColumnWidth(3, 220); // email
    sheet.setColumnWidth(4, 200); // website
    sheet.setColumnWidth(6, 320); // message
  }

  return sheet;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * A GET on the deployment URL is a health check, not a lead.
 *
 * It exists so a misconfiguration can be found without submitting a fake lead —
 * which is exactly how the Supabase breakage went unnoticed for months.
 */
function doGet(e) {
  // Confirmation mode: /exec?requestId=... answers "did this write land?".
  //
  // Google sometimes runs doPost and writes the row but never delivers the
  // response — observed repeatedly on 25 September 2026, including twice where
  // both the initial attempt and its retry came back empty while the sheet grew
  // by two rows. The caller was left reporting failure for leads that had in
  // fact been saved, and on this site's traffic one visitor turned away by a
  // false error is expensive.
  //
  // So rather than guess after a failed write, the caller asks. Answering from
  // the same CacheService entry that powers de-duplication means no sheet scan,
  // and a requestId is an unguessable uuid whose existence reveals nothing, so
  // this needs no secret — which also keeps the secret out of a query string
  // that Google would log.
  var askedFor = e && e.parameter ? String(e.parameter.requestId || '').trim() : '';
  if (askedFor) {
    var found = null;
    try {
      found = CacheService.getScriptCache().get('lead:' + askedFor);
    } catch (err) {
      return jsonOut_({ ok: false, version: CONFIG.SCRIPT_VERSION, error: 'cache unavailable' });
    }
    return jsonOut_({
      ok: true,
      version: CONFIG.SCRIPT_VERSION,
      requestId: askedFor,
      found: Boolean(found),
      row: found ? Number(found) : null,
    });
  }

  var secret = setting_('SHARED_SECRET');
  var configured = secret !== 'CHANGE_ME_TO_A_LONG_RANDOM_STRING' && secret.length >= 16;
  var rows = 0;
  try {
    rows = Math.max(0, getLeadsSheet_().getLastRow() - 1);
  } catch (err) {
    return jsonOut_({ ok: false, error: 'sheet unavailable: ' + err });
  }
  return jsonOut_({
    ok: true,
    version: CONFIG.SCRIPT_VERSION,
    secretConfigured: configured,
    dedupe: true,
    leadsStored: rows,
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut_({ ok: false, error: 'empty body' });
    }

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return jsonOut_({ ok: false, error: 'invalid json' });
    }

    var secret = setting_('SHARED_SECRET');
    if (secret === 'CHANGE_ME_TO_A_LONG_RANDOM_STRING') {
      return jsonOut_({ ok: false, error: 'script not configured' });
    }
    if (body.secret !== secret) {
      return jsonOut_({ ok: false, error: 'unauthorized' });
    }

    // An email is the one field without which a lead is not a lead.
    var email = String(body.email || '').trim();
    if (!email || email.indexOf('@') === -1) {
      return jsonOut_({ ok: false, error: 'email required' });
    }

    // Idempotency.
    //
    // A cold Apps Script container takes longer to answer than the calling
    // function is willing to wait, so the caller times out while this script
    // goes on to write the row. Measured on production more than once: the
    // route returned 500, the row appeared, the visitor was told it failed.
    // The caller therefore retries with the SAME requestId, and this is what
    // stops the retry becoming a second row.
    //
    // CacheService rather than a sheet column: the lookup has to be fast (it
    // runs before every write) and it only has to survive the seconds between
    // an attempt and its retry. Six hours is generous for that.
    var requestId = String(body.requestId || '').trim();
    var cache = null;
    if (requestId) {
      try {
        cache = CacheService.getScriptCache();
        var seen = cache.get('lead:' + requestId);
        if (seen) {
          return jsonOut_({ ok: true, row: Number(seen), duplicate: true });
        }
      } catch (cacheErr) {
        Logger.log('cache unavailable, proceeding without dedupe: ' + cacheErr);
      }
    }

    var sheet = getLeadsSheet_();
    var stamp = Utilities.formatDate(new Date(), 'Asia/Karachi', 'yyyy-MM-dd HH:mm');

    sheet.appendRow([
      stamp,
      String(body.name || '').trim(),
      email,
      String(body.website || '').trim(),
      String(body.phone || '').trim(),
      String(body.business || '').trim(),
      String(body.message || '').trim(),
      String(body.source || '').trim(),
      String(body.utmSource || '').trim(),
      String(body.utmCampaign || '').trim(),
      String(body.referrer || '').trim(),
    ]);

    var rowNumber = sheet.getLastRow();

    // Recorded immediately after the append and before the email, because the
    // email is the slow part and a retry arriving mid-send must still be
    // recognised as a duplicate.
    if (requestId && cache) {
      try {
        cache.put('lead:' + requestId, String(rowNumber), 21600);
      } catch (cacheErr) {
        Logger.log('could not cache requestId: ' + cacheErr);
      }
    }

    // The alert is best-effort: if the mail quota is exhausted the lead is
    // already in the sheet, and reporting failure here would make the website
    // tell a real lead that their submission failed when it did not.
    if (CONFIG.SEND_EMAIL) {
      try {
        MailApp.sendEmail({
          to: setting_('NOTIFY_EMAIL'),
          // Hitting Reply in the alert replies to the lead, not to yourself.
          // The offer on the site is a reply within 24 hours; every step
          // removed between reading the alert and answering it is time saved.
          replyTo: email,
          name: 'SearchPrex leads',
          subject: 'New SearchPrex lead: ' + (body.name || email),
          body: [
            'Name:      ' + (body.name || '-'),
            'Email:     ' + email,
            'Website:   ' + (body.website || '-'),
            'Phone:     ' + (body.phone || '-'),
            'Business:  ' + (body.business || '-'),
            'Message:   ' + (body.message || '-'),
            'Source:    ' + (body.source || '-'),
            'UTM:       ' + (body.utmSource || '-') + ' / ' + (body.utmCampaign || '-'),
            'Referrer:  ' + (body.referrer || '-'),
            '',
            'Received:  ' + stamp + ' PKT',
            'Sheet row: ' + rowNumber,
            '',
            'You promised a reply within 24 hours. The clock started at the time above.',
          ].join('\n'),
        });
      } catch (mailErr) {
        Logger.log('lead stored, email failed: ' + mailErr);
      }
    }

    return jsonOut_({ ok: true, row: rowNumber });
  } catch (err) {
    Logger.log('doPost failed: ' + err);
    return jsonOut_({ ok: false, error: String(err) });
  }
}
