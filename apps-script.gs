/**
 * Alfred Hotels · Audit Client Mystère : base de données (Google Sheet) et photos (Google Drive).
 * À coller dans Extensions > Apps Script d'un Google Sheet, puis Déployer > Application Web
 * (Exécuter en tant que : moi · Accès : Tout le monde).
 */
const SHEET = 'data';
const PHOTO_FOLDER = 'Alfred Audit Photos';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(['collection', 'id', 'json', 'updated']); sh.setFrozenRows(1); }
  return sh;
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* Lecture : ?all=1 (plateforme) ou ?id=xxx (lien d'un client mystère) */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const rows = sheet_().getDataRange().getValues().slice(1);
  const items = rows
    .filter(r => r[0] && (p.all || String(r[1]) === String(p.id || '')))
    .map(r => ({ c: r[0], id: String(r[1]), d: JSON.parse(r[2] || '{}') }));
  return out_({ ok: true, items });
}

/* Écriture : {action:'set', c, id, data, merge} ou {action:'upload', name, data(base64), mime} */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const b = JSON.parse(e.postData.contents);
    if (b.action === 'upload') {
      const it = DriveApp.getFoldersByName(PHOTO_FOLDER);
      const folder = it.hasNext() ? it.next() : DriveApp.createFolder(PHOTO_FOLDER);
      const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(b.data), b.mime || 'image/jpeg', b.name || 'photo.jpg'));
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return out_({ ok: true, id: file.getId(), url: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200' });
    }
    if (b.action === 'set') {
      const sh = sheet_();
      const vals = sh.getDataRange().getValues();
      const now = new Date().toISOString();
      for (let i = 1; i < vals.length; i++) {
        if (vals[i][0] === b.c && String(vals[i][1]) === String(b.id)) {
          const d = b.merge ? Object.assign(JSON.parse(vals[i][2] || '{}'), b.data) : b.data;
          sh.getRange(i + 1, 3, 1, 2).setValues([[JSON.stringify(d), now]]);
          return out_({ ok: true });
        }
      }
      sh.appendRow([b.c, String(b.id), JSON.stringify(b.data), now]);
      return out_({ ok: true });
    }
    return out_({ ok: false, error: 'Action inconnue' });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
