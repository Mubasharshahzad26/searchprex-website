/**
 * ═══════════════════════════════════════════════════════════════
 *  MSO Autopilot — Google Sheets Sync Engine (with Real-Time Refresh)
 *  Direct Integration with NicheSEO Pro AI Engine
 * ═══════════════════════════════════════════════════════════════
 *
 * Features:
 * 1. 🔄 Real-Time Refresh Checkbox in Cell C2 of Executive Summary.
 * 2. ⚡ Custom Menu "MSO Autopilot" -> "Sync Live Data".
 * 3. ⏰ Background Auto-Sync Trigger support.
 * 4. Backward compatible with old "updateDashboard" trigger.
 *
 * ── What changed in this version ────────────────────────────────
 * The status column (C5:C9) was written as fixed strings, so it kept
 * advertising "8-Key Gemini Pool" and "500 Daily Target" long after the
 * pool grew to 30 keys and the target to 1,000. Those values now come
 * from the API, which reports what the engines are actually running.
 *
 * Two Executive Summary rows changed as well. "Priority 0 URLs
 * Remaining / Cleared" had reached 0 and 100% permanently — a finished
 * milestone taking up two of seven rows — and are replaced by
 * "Published Today" and "Catalogue Progress", which still move. The
 * "10K Goal" row became "Estimated Days to Complete", measured against
 * the real product catalogue rather than a target passed long ago.
 */

var SPREADSHEET_ID = '176wx2Nj85KmGSRu9Dsum9r3LZEDdkxwPXgV0SHMIVPo';
var NICHESEO_API_URL = 'https://nicheseopro.com';

/** Helper to get Spreadsheet instance in any execution context */
function getTargetSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/** Safe user notification */
function notifyUser(msg, title) {
  Logger.log('[' + (title || 'INFO') + '] ' + msg);
  try {
    var ui = SpreadsheetApp.getUi();
    if (ui) {
      ui.alert((title ? title + '\n\n' : '') + msg);
    }
  } catch (e) {}
}

/** Menu trigger when opened from inside Google Sheets */
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    if (ui) {
      ui.createMenu('MSO Autopilot')
        .addItem('Sync Live Data Now', 'syncMsoData')
        .addSeparator()
        .addItem('Sync SEO Roadmap', 'syncSeoRoadmap')
        .addSeparator()
        .addItem('Enable 5-Min Hands-Free Auto-Sync', 'enableAutoSyncTrigger')
        .addItem('Disable Auto-Sync', 'disableAutoSyncTrigger')
        .addSeparator()
        .addItem('Refresh Executive Summary', 'syncExecutiveSummary')
        .addItem('Refresh Daily Summary', 'syncDailySummary')
        .addToUi();
    }
  } catch (e) {
    Logger.log('Note: Run "syncMsoData" in editor, or use the sheet menu.');
  }
}

/**
 * 5-Minute Hands-Free Auto-Sync Trigger Installer
 */
function enableAutoSyncTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncMsoData') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('syncMsoData')
    .timeBased()
    .everyMinutes(5)
    .create();

  notifyUser('✅ 5-Minute Hands-Free Auto-Sync is now ENABLED!\n\nGoogle Sheets will now update automatically every 5 minutes in the background from NicheSEO Pro without requiring any clicks.', 'Auto-Sync Activated');
}

/**
 * Disable Auto-Sync Trigger
 */
function disableAutoSyncTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var count = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncMsoData') {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }
  }
  notifyUser('🛑 Auto-Sync disabled. You can still use the C2 checkbox or the "Sync Live Data Now" menu anytime.', 'Auto-Sync Disabled');
}

/**
 * Real-Time Checkbox Trigger:
 * When client checks the box in Cell C2 of "Executive Summary",
 * it automatically unchecks the box and syncs live data immediately!
 */
function onEdit(e) {
  try {
    if (!e || !e.range) return;
    var range = e.range;
    var sheet = range.getSheet();
    if (sheet.getName() === 'Executive Summary' && range.getA1Notation() === 'C2') {
      if (range.getValue() === true) {
        range.setValue(false); // Reset checkbox
        syncMsoData();
      }
    }
  } catch (err) {
    Logger.log('onEdit error: ' + err.message);
  }
}

/** Main Sync Function */
function syncMsoData() {
  Logger.log('Starting MSO Autopilot Sync from ' + NICHESEO_API_URL + '...');
  var url = NICHESEO_API_URL + '/api/reports/mso-summary';

  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'Accept': 'application/json' },
      muteHttpExceptions: true
    });

    var code = response.getResponseCode();
    if (code !== 200) {
      Logger.log('Sync Error: HTTP ' + code + '\n' + response.getContentText());
      return;
    }

    var data = JSON.parse(response.getContentText());
    var ss = getTargetSpreadsheet();

    // 1. Update Executive Summary Tab
    //  data.status and data.today are passed through so the status column and
    //  the "Published Today" row read live values instead of fixed text.
    updateExecutiveSummaryTab(ss, data.summary, data.generatedAt, data.status, data.today);

    // 2. Update Daily Summary Tab
    if (data.dailyStats && data.dailyStats.length > 0) {
      updateDailySummaryTab(ss, data.dailyStats);
    }

    // 3. Update Published URLs Log Tab (Primary) and Recent URLs Tab
    if (data.recentUrls && data.recentUrls.length > 0) {
      updatePublishedUrlsLogTab(ss, data.recentUrls);
    }

    // 4. Update SEO Execution Roadmap Tab
    if (data.seoRoadmap && data.seoRoadmap.length > 0) {
      updateSeoRoadmapTab(ss, data.seoRoadmap);
    }

    Logger.log('[Sync] MSO Autopilot and SEO Roadmap successfully synced with NicheSEO Pro');
    try {
      ss.toast('MSO Autopilot and SEO Roadmap successfully synced with NicheSEO Pro', 'Sync Complete', 5);
    } catch (e) {}

  } catch (err) {
    Logger.log('Sync Failed: ' + err.message);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 *  1. Executive Summary Tab (Enterprise Styling & KPI Cards)
 * ═══════════════════════════════════════════════════════════════
 */
function updateExecutiveSummaryTab(ss, summary, generatedAt, status, today) {
  var sheet = ss.getSheetByName('Executive Summary');
  if (!sheet) sheet = ss.insertSheet('Executive Summary');

  status = status || {};
  today = today || {};

  //  Timestamp carries its zone. The daily rows are counted on Pakistan time
  //  and this line was rendered in New York time, so the two disagreed by nine
  //  and a half hours with nothing on the sheet to say why.
  var lastUpdatedStr = generatedAt || new Date().toISOString();
  try {
    var d = new Date(lastUpdatedStr);
    if (!isNaN(d.getTime())) {
      lastUpdatedStr = Utilities.formatDate(d, 'Asia/Karachi', 'M/d/yyyy, h:mm:ss a') + ' PKT';
    }
  } catch (_) {}

  // 1. Set generous column widths to ensure zero clipping
  sheet.setColumnWidth(1, 280); // Column A: Metric Name
  sheet.setColumnWidth(2, 170); // Column B: Value
  sheet.setColumnWidth(3, 230); // Column C: Action / Status
  sheet.setRowHeight(1, 38);
  sheet.setRowHeight(2, 28);
  for (var r = 3; r <= 9; r++) {
    sheet.setRowHeight(r, 26);
  }

  // 2. Set Content
  sheet.getRange('A1:B1').merge();
  sheet.getRange('A1').setValue('MSO Autopilot — Executive Summary');
  sheet.getRange('C1').setValue('🟢 Live Sync Connected');

  sheet.getRange('A2').setValue('Metric');
  sheet.getRange('B2').setValue('Value');
  sheet.getRange('C2').setValue(false); // Checkbox

  //  Success rate falls back to 'N/A' rather than '99.4%'. A hardcoded
  //  number that looks like a real measurement is worse than an honest blank.
  var metrics = [
    ['Total Pages Published', summary.totalPublished || 0],
    ['Total Submitted to Google', summary.totalSubmitted || 0],
    ['Success Rate (Last 24h)', summary.successRate24h || 'N/A'],
    ['Published Today', (today.published != null ? today.published : 0)],
    ['Catalogue Progress', summary.catalogueProgress || 'N/A'],
    ['Cost So Far', summary.costLifetime || '$0.00'],
    ['Estimated Days to Complete', summary.daysToGoal || 'N/A']
  ];

  sheet.getRange(3, 1, metrics.length, 2).setValues(metrics);

  //  Status column, live from the API. Anything the API does not send falls
  //  back to a neutral label rather than a stale claim.
  sheet.getRange('C3').setValue('🔄 Click box in C2 to refresh');
  sheet.getRange('C4').setValue('Last: ' + lastUpdatedStr);
  sheet.getRange('C5').setValue('⚡ Engine: ' + (status.engineLabel || 'NicheSEO Pro + Searchprex'));
  sheet.getRange('C6').setValue('🔑 ' + (status.geminiKeyPoolLabel || 'Gemini Pool Active'));
  sheet.getRange('C7').setValue('🛡️ ' + (status.indexingAccountsLabel || 'Google Indexing Active'));
  sheet.getRange('C8').setValue('📈 ' + (status.dailyTargetLabel || 'Daily Target: Active'));
  sheet.getRange('C9').setValue('💰 ' + (status.costModel || 'Auto-Sync: Active (5m)'));

  // 3. Typography & Background Styling
  // Header Row 1
  sheet.getRange('A1:B1')
    .setBackground('#0F172A')
    .setFontColor('#FFFFFF')
    .setFontSize(12)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');

  sheet.getRange('C1')
    .setBackground('#ECFDF5')
    .setFontColor('#047857')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // Subheader Row 2
  sheet.getRange('A2:B2')
    .setBackground('#F1F5F9')
    .setFontColor('#334155')
    .setFontSize(10)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.getRange('A2').setHorizontalAlignment('left');
  sheet.getRange('B2').setHorizontalAlignment('right');

  sheet.getRange('C2')
    .setBackground('#F8FAFC')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  try {
    sheet.getRange('C2').insertCheckboxes();
  } catch (e) {}

  // Zebra Rows 3-9
  for (var i = 0; i < metrics.length; i++) {
    var rowIdx = 3 + i;
    var rowBg = (i % 2 === 0) ? '#FFFFFF' : '#F8FAFC';
    sheet.getRange(rowIdx, 1, 1, 2).setBackground(rowBg);
    sheet.getRange(rowIdx, 1).setFontColor('#1E293B').setFontSize(10).setFontWeight('normal').setHorizontalAlignment('left');
    sheet.getRange(rowIdx, 2).setFontColor('#0F172A').setFontSize(10).setFontWeight('bold').setHorizontalAlignment('right');
  }

  //  Number formats are set explicitly on every numeric cell. B7 used to
  //  inherit a percentage format from whatever was in it before, which is how
  //  a plain count once rendered as 179000.00%.
  sheet.getRange('B3').setNumberFormat('#,##0'); // Total Published
  sheet.getRange('B4').setNumberFormat('#,##0'); // Total Submitted
  sheet.getRange('B5').setNumberFormat('@').setFontColor('#047857'); // Success Rate (text)
  sheet.getRange('B6').setNumberFormat('#,##0'); // Published Today
  sheet.getRange('B7').setNumberFormat('@'); // Catalogue Progress (text)
  sheet.getRange('B8').setNumberFormat('@'); // Cost So Far (text)
  sheet.getRange('B9').setNumberFormat('@').setBackground('#ECFDF5').setFontColor('#047857');

  // Side status styling in C3:C9
  sheet.getRange('C3:C9')
    .setBackground('#F8FAFC')
    .setFontColor('#64748B')
    .setFontSize(8.5)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // Borders
  sheet.getRange('A2:B9').setBorder(true, true, true, true, true, true, '#E2E8F0', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('C1:C9').setBorder(true, true, true, true, false, false, '#E2E8F0', SpreadsheetApp.BorderStyle.SOLID);

  // 4. CRITICAL: Clear old lingering rows (10 through 35)
  try {
    var maxRows = sheet.getMaxRows();
    if (maxRows >= 10) {
      sheet.getRange(10, 1, Math.min(25, maxRows - 9), 5).clearContent().clearFormat();
    }
  } catch (e) {
    Logger.log('Error clearing lower rows: ' + e.message);
  }

  Logger.log('Executive Summary tab styled & updated.');
}

/**
 * ═══════════════════════════════════════════════════════════════
 *  2. Daily Summary Tab (Pinned Header & Today Highlight)
 * ═══════════════════════════════════════════════════════════════
 */
function updateDailySummaryTab(ss, dailyStats) {
  var sheet = ss.getSheetByName('Daily Summary') || ss.getSheetByName('Daily Progress');
  if (!sheet) sheet = ss.insertSheet('Daily Summary');

  sheet.setColumnWidth(1, 130); // Date
  sheet.setColumnWidth(2, 120); // Attempted
  sheet.setColumnWidth(3, 120); // Published
  sheet.setColumnWidth(4, 100); // Errors
  sheet.setColumnWidth(5, 120); // Cost ($)
  sheet.setRowHeight(1, 30);
  sheet.setFrozenRows(1);

  sheet.getRange('A1:E1').setValues([['Date (PKT)', 'Attempted', 'Published', 'Errors', 'Cost ($)']]);
  sheet.getRange('A1:E1')
    .setBackground('#0F172A')
    .setFontColor('#FFFFFF')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  var rows = dailyStats.map(function(d) {
    return [d.date, d.attempted, d.published, d.errors, Number(d.cost)];
  });

  if (rows.length > 0) {
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 5).clearContent().clearFormat();
    }
    sheet.getRange(2, 1, rows.length, 5).setValues(rows);

    // Style rows
    for (var i = 0; i < rows.length; i++) {
      var rIdx = 2 + i;
      var isToday = (i === 0);
      var rowRange = sheet.getRange(rIdx, 1, 1, 5);

      if (isToday) {
        // Highlight today's active row with soft emerald green
        rowRange.setBackground('#ECFDF5')
          .setFontColor('#065F46')
          .setFontWeight('bold')
          .setFontSize(9.5);
      } else {
        rowRange.setBackground(i % 2 === 0 ? '#FFFFFF' : '#F8FAFC')
          .setFontColor('#1E293B')
          .setFontWeight('normal')
          .setFontSize(9);
      }
      sheet.getRange(rIdx, 1).setHorizontalAlignment('center');
      sheet.getRange(rIdx, 2, 1, 3).setHorizontalAlignment('center');
      sheet.getRange(rIdx, 5).setHorizontalAlignment('right').setNumberFormat('$#,##0.00');
    }

    sheet.getRange(1, 1, rows.length + 1, 5).setBorder(true, true, true, true, true, true, '#E2E8F0', SpreadsheetApp.BorderStyle.SOLID);
  }
  Logger.log('Daily Summary tab updated (' + rows.length + ' rows).');
}

/**
 * ═══════════════════════════════════════════════════════════════
 *  3. Published URLs Log Tab (Pinned Header & Wide Layout)
 * ═══════════════════════════════════════════════════════════════
 */
function updatePublishedUrlsLogTab(ss, recentUrls) {
  var targetTabs = ['Published URLs Log', 'Recent URLs'];

  targetTabs.forEach(function(tabName) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet && tabName === 'Published URLs Log') {
      sheet = ss.insertSheet('Published URLs Log');
    }
    if (!sheet) return;

    sheet.setColumnWidth(1, 420); // Live URL
    sheet.setColumnWidth(2, 180); // Published Date
    sheet.setColumnWidth(3, 100); // Quality Score
    sheet.setColumnWidth(4, 130); // Indexing Status
    sheet.setColumnWidth(5, 250); // Account Used
    sheet.setRowHeight(1, 30);
    sheet.setFrozenRows(1);

    sheet.getRange('A1:E1').setValues([['Live URL', 'Published Date (PKT)', 'Quality Score', 'Indexing Status', 'Account Used']]);
    sheet.getRange('A1:E1')
      .setBackground('#0F172A')
      .setFontColor('#FFFFFF')
      .setFontSize(10)
      .setFontWeight('bold')
      .setVerticalAlignment('middle');
    sheet.getRange('A1').setHorizontalAlignment('left');
    sheet.getRange('B1:D1').setHorizontalAlignment('center');
    sheet.getRange('E1').setHorizontalAlignment('left');

    var rows = recentUrls.map(function(u) {
      //  The API already formats this in Pakistan time. The local fallback
      //  below matches, so a row cannot silently switch time zones depending
      //  on which branch produced it.
      var pubDateStr = u.publishedAtFormatted || u.publishedAt;
      try {
        if (!u.publishedAtFormatted && u.publishedAt) {
          var d = new Date(u.publishedAt);
          if (!isNaN(d.getTime())) {
            pubDateStr = Utilities.formatDate(d, 'Asia/Karachi', 'M/d/yyyy, h:mm:ss a');
          }
        }
      } catch (_) {}

      var accountStr = u.account || 'Michigan Indexing (NicheSEO Pool)';
      if (accountStr.indexOf('Michigan Indexing') === -1) {
        accountStr = 'Michigan Indexing (' + accountStr + ')';
      }

      return [
        u.liveUrl,
        pubDateStr,
        Number(u.qualityScore || 100),
        u.indexingStatus || 'Submitted',
        accountStr
      ];
    });

    if (rows.length > 0) {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, 5).clearContent().clearFormat();
      }
      sheet.getRange(2, 1, rows.length, 5).setValues(rows);

      // Formatting data rows
      for (var j = 0; j < rows.length; j++) {
        var rowNum = 2 + j;
        var rowBg = (j % 2 === 0) ? '#FFFFFF' : '#F8FAFC';
        sheet.getRange(rowNum, 1, 1, 5).setBackground(rowBg).setFontSize(9);
        sheet.getRange(rowNum, 1).setHorizontalAlignment('left').setFontColor('#2563EB'); // Clickable URL blue
        sheet.getRange(rowNum, 2).setHorizontalAlignment('center').setFontColor('#475569');
        sheet.getRange(rowNum, 3).setHorizontalAlignment('center').setFontWeight('bold').setFontColor('#047857');
        sheet.getRange(rowNum, 4).setHorizontalAlignment('center').setFontWeight('bold').setFontColor('#047857');
        sheet.getRange(rowNum, 5).setHorizontalAlignment('left').setFontColor('#334155');
      }

      sheet.getRange(1, 1, rows.length + 1, 5).setBorder(true, true, true, true, true, true, '#E2E8F0', SpreadsheetApp.BorderStyle.SOLID);
    }
    Logger.log(tabName + ' tab updated (' + rows.length + ' rows).');
  });
}

function updateRecentUrlsTab(ss, recentUrls) {
  updatePublishedUrlsLogTab(ss, recentUrls);
}

// Aliases for compatibility
function updateDashboard() { syncMsoData(); }
function syncExecutiveSummary() { syncMsoData(); }
function syncDailySummary() { syncMsoData(); }
function refreshSheet() { syncMsoData(); }
function syncSeoRoadmap() { syncMsoData(); }

/**
 * ═══════════════════════════════════════════════════════════════
 *  4. SEO Execution Roadmap Tab (Master Sprint & Execution Plan)
 * ═══════════════════════════════════════════════════════════════
 */
function updateSeoRoadmapTab(ss, seoRoadmap) {
  if (!seoRoadmap || seoRoadmap.length === 0) return;
  var sheet = ss.getSheetByName('SEO Execution Roadmap');
  if (!sheet) sheet = ss.insertSheet('SEO Execution Roadmap');

  sheet.setColumnWidth(1, 110); // Date
  sheet.setColumnWidth(2, 320); // Task Name
  sheet.setColumnWidth(3, 200); // Category
  sheet.setColumnWidth(4, 110); // Priority
  sheet.setColumnWidth(5, 450); // SEO Logic & Client Rationale
  sheet.setColumnWidth(6, 120); // Status
  sheet.setColumnWidth(7, 340); // Proof / Live URL
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);

  var headers = [
    ['Date', 'Task Name', 'Category', 'Priority', 'SEO Logic & Client Value', 'Status', 'Proof / Target URL']
  ];
  sheet.getRange('A1:G1').setValues(headers);
  sheet.getRange('A1:G1')
    .setBackground('#0F172A')
    .setFontColor('#FFFFFF')
    .setFontSize(10)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.getRange('A1').setHorizontalAlignment('center');
  sheet.getRange('B1').setHorizontalAlignment('left');
  sheet.getRange('C1:D1').setHorizontalAlignment('center');
  sheet.getRange('E1').setHorizontalAlignment('left');
  sheet.getRange('F1').setHorizontalAlignment('center');
  sheet.getRange('G1').setHorizontalAlignment('left');

  var rows = seoRoadmap.map(function(t) {
    return [
      t.date || '',
      t.task_name || '',
      t.category || '',
      t.priority || '',
      t.logic || '',
      t.status || 'Planned',
      t.proof_url || ''
    ];
  });

  if (rows.length > 0) {
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 7).clearContent().clearFormat();
    }
    sheet.getRange(2, 1, rows.length, 7).setValues(rows);

    for (var i = 0; i < rows.length; i++) {
      var rIdx = 2 + i;
      var task = seoRoadmap[i];
      var rowBg = (i % 2 === 0) ? '#FFFFFF' : '#F8FAFC';
      sheet.setRowHeight(rIdx, 28);
      sheet.getRange(rIdx, 1, 1, 7).setBackground(rowBg).setFontSize(9);

      // Col 1: Date
      sheet.getRange(rIdx, 1).setHorizontalAlignment('center').setFontColor('#475569');

      // Col 2: Task Name
      sheet.getRange(rIdx, 2).setHorizontalAlignment('left').setFontWeight('bold').setFontColor('#0F172A');

      // Col 3: Category
      sheet.getRange(rIdx, 3).setHorizontalAlignment('center').setFontColor('#334155');

      // Col 4: Priority
      var pCell = sheet.getRange(rIdx, 4);
      pCell.setHorizontalAlignment('center').setFontWeight('bold');
      if (task.priority === 'Critical') {
        pCell.setBackground('#FEE2E2').setFontColor('#B91C1C');
      } else if (task.priority === 'High') {
        pCell.setBackground('#FFEDD5').setFontColor('#C2410C');
      } else {
        pCell.setBackground('#F1F5F9').setFontColor('#475569');
      }

      // Col 5: SEO Logic
      sheet.getRange(rIdx, 5).setHorizontalAlignment('left').setFontColor('#334155').setWrap(true);

      // Col 6: Status
      var sCell = sheet.getRange(rIdx, 6);
      sCell.setHorizontalAlignment('center').setFontWeight('bold');
      if (task.status === 'Done') {
        sCell.setBackground('#ECFDF5').setFontColor('#047857');
      } else if (task.status === 'In Progress') {
        sCell.setBackground('#FEF3C7').setFontColor('#B45309');
      } else {
        sCell.setBackground('#F1F5F9').setFontColor('#64748B');
      }

      // Col 7: Proof / Target URL
      var uCell = sheet.getRange(rIdx, 7);
      uCell.setHorizontalAlignment('left');
      if (task.proof_url && task.proof_url.indexOf('http') === 0) {
        uCell.setFontColor('#2563EB');
      } else {
        uCell.setFontColor('#64748B');
      }
    }

    sheet.getRange(1, 1, rows.length + 1, 7).setBorder(true, true, true, true, true, true, '#E2E8F0', SpreadsheetApp.BorderStyle.SOLID);
  }
  Logger.log('SEO Execution Roadmap tab updated (' + rows.length + ' tasks).');
}

/**
 * 1-Click Sync for SEO Execution Roadmap (Including Store-Wide Audit Task)
 */
function updateRoadmapSheet() {
  var ss = getTargetSpreadsheet();
  var tasks = [
    {
      "date": "2026-09-14",
      "task_name": "Autopilot Architecture & Safety Audit",
      "category": "Infrastructure & Safety",
      "priority": "Critical",
      "logic": "Analyzed existing background schedulers and engines across NicheSEO Pro to identify automation loop and protect live rankings.",
      "status": "Done",
      "proof_url": "NicheSEO Pro Database (autopilot_configs & mso_settings)"
    },
    {
      "date": "2026-09-14",
      "task_name": "Manual Approval Gating Lock (requires_approval = 1)",
      "category": "Safeguards & Control",
      "priority": "Critical",
      "logic": "Locked direct automated publishing so no machine changes can overwrite live pages without explicit agency approval.",
      "status": "Done",
      "proof_url": "Database Lock: requires_approval = 1"
    },
    {
      "date": "2026-09-14",
      "task_name": "October Season Masterpiece Architecture Deployment",
      "category": "Landing Page CRO & E-E-A-T",
      "priority": "High",
      "logic": "Deployed high-converting Blade HQ inspired commercial landing page for seasonal fall traffic without altering native homepage (#3821).",
      "status": "Done",
      "proof_url": "https://www.michigansportsoutdoor.com/october-season/"
    },
    {
      "date": "2026-09-14",
      "task_name": "Bespoke Visual Assets & MSO Journal Hub Integration",
      "category": "Visual E-E-A-T & CRO",
      "priority": "High",
      "logic": "Created and deployed 4 bespoke high-converting editorial blog covers (Benchmade, MagnaCut, Morakniv, Hunting) + 2 branded YouTube Field Test cards.",
      "status": "Done",
      "proof_url": "https://www.michigansportsoutdoor.com/october-season/#mso-journal"
    },
    {
      "date": "2026-09-14",
      "task_name": "Authentic Product Inventory Integration (16 SKUs)",
      "category": "Commercial Conversion",
      "priority": "High",
      "logic": "Extracted 16 verified live MSO WooCommerce knife products (8 New Knives, 8 Hot Sales) with real pricing and direct cart triggers.",
      "status": "Done",
      "proof_url": "https://www.michigansportsoutdoor.com/october-season/#featured-knives"
    },
    {
      "date": "2026-09-14",
      "task_name": "Full Structured Schema Suite Implementation",
      "category": "Technical SEO",
      "priority": "Critical",
      "logic": "Embedded complete JSON-LD schema bundle (Product, FAQPage, Review/Rating, BreadcrumbList) for maximum Google Rich Results visibility.",
      "status": "Done",
      "proof_url": "JSON-LD Suite on /october-season/"
    },
    {
      "date": "2026-09-15",
      "task_name": "Full Autopilot Scheduler Shutdown (enabled = 0)",
      "category": "Safety & System Control",
      "priority": "Critical",
      "logic": "Completely halted background 3-minute cron loop (scheduler_enabled: false) and dashboard automated runs to eliminate rogue crawling.",
      "status": "Done",
      "proof_url": "Database state: Paused"
    },
    {
      "date": "2026-09-15",
      "task_name": "GSC Indexing & Rich Results Verification for October Page",
      "category": "Technical Validation",
      "priority": "High",
      "logic": "Submit /october-season/ to Google Indexing API pool and run Google Rich Results validation test to confirm schema eligibility.",
      "status": "In Progress",
      "proof_url": "Google Search Console & Rich Results Tool"
    },
    {
      "date": "2026-09-15",
      "task_name": "Store-Wide 5-Tier SEO, Catalogue & LLM/GEO Audit",
      "category": "Strategic & Technical Audit",
      "priority": "Critical",
      "logic": "Conducted store-wide audit across 26,111 published URLs, top categories, brand hubs, CTR leakage on 525 URLs (Aitor Shark Master #7.7), and diagnosed Google Indexing API quota exhaustion.",
      "status": "Done",
      "proof_url": "Audit Report Delivered & Synthesized (Ready for Action)"
    },
    {
      "date": "2026-09-16",
      "task_name": "Category Hub Modernization: Hunting Knives",
      "category": "Category Architecture",
      "priority": "High",
      "logic": "Transform /product-category/knives-tools/hunting-knives/ with Blade HQ layout, buying guide hero, and category FAQ schema to capture fall hunters.",
      "status": "Planned",
      "proof_url": "https://www.michigansportsoutdoor.com/product-category/knives-tools/hunting-knives/"
    },
    {
      "date": "2026-09-17",
      "task_name": "Category Hub Modernization: Pocket & Folding Knives",
      "category": "Category Architecture",
      "priority": "High",
      "logic": "Upgrade /product-category/knives-tools/folding-knives/ with subcategory pills (EDC, Tactical, Lockback), semantic H2/H3 headers, and FAQ markup.",
      "status": "Planned",
      "proof_url": "https://www.michigansportsoutdoor.com/product-category/knives-tools/folding-knives/"
    },
    {
      "date": "2026-09-18",
      "task_name": "Top 5 High-Impression Product On-Page SEO (Batch 1)",
      "category": "Product On-Page SEO",
      "priority": "High",
      "logic": "Inject Blade HQ technical spec tables (Blade Steel MagnaCut/S30V, HRC hardness, lock mechanism, grind) + Product Schema with in-stock offers.",
      "status": "Planned",
      "proof_url": "Top 5 Product URLs in Search Console"
    },
    {
      "date": "2026-09-19",
      "task_name": "Top 5 High-Impression Product On-Page SEO (Batch 2)",
      "category": "Product On-Page SEO",
      "priority": "High",
      "logic": "Implement technical spec tables, WebP high-res imagery with descriptive alt tags, and AggregateRating review schemas for products 6 to 10.",
      "status": "Planned",
      "proof_url": "Product URLs 6 to 10 in Search Console"
    },
    {
      "date": "2026-09-20",
      "task_name": "Internal Linking Silo & Link Equity Distribution",
      "category": "Internal PR & Silo Structure",
      "priority": "Medium",
      "logic": "Construct bi-directional contextual links from high-ranking MSO blog posts to commercial category hubs and high-converting product pages.",
      "status": "Planned",
      "proof_url": "MSO Blog & Category Silo Structure"
    },
    {
      "date": "2026-09-21",
      "task_name": "Core Web Vitals & Image Payload Audit",
      "category": "Performance & UX",
      "priority": "Medium",
      "logic": "Audit Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) across updated pages, ensuring WebP compression and responsive dimensions.",
      "status": "Planned",
      "proof_url": "Google PageSpeed Insights Audit"
    },
    {
      "date": "2026-09-22",
      "task_name": "Weekly Ranking Movement & Revenue Impact Executive Review",
      "category": "Analytics & Reporting",
      "priority": "High",
      "logic": "Audit 7-day GSC click/impression growth, rank positioning changes on optimized keywords, and WooCommerce conversion gains for client report.",
      "status": "Planned",
      "proof_url": "Google Search Console Performance Report"
    }
  ];
  updateSeoRoadmapTab(ss, tasks);
  if (typeof formatRoadmapTab === 'function') {
    formatRoadmapTab();
  }
}

