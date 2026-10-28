/* GharKhata final update layer. Load this AFTER app.js. */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const hi = () => document.documentElement.lang === 'hi';
  const say = (h, e) => hi() ? h : e;
  const style = document.createElement('style');
  style.textContent = '.field select,.filters select,#groceryRows select{appearance:auto;-webkit-appearance:menulist;pointer-events:auto;position:relative;z-index:1;touch-action:manipulation}.more-details{grid-column:1/-1;border:1px solid #d8e2dc;background:#fff;border-radius:12px;padding:12px}.more-details summary{font-weight:800;color:#155e4b;cursor:pointer;list-style:none}.more-details summary::-webkit-details-marker{display:none}.more-details summary:after{content:"＋";float:right}.more-details[open] summary:after{content:"−"}.more-details .field{margin-top:12px}.grocery-import-tools{background:#fff;border:1px solid #d8e2dc;border-radius:14px;padding:10px 12px;margin:10px 0}.grocery-import-tools .grocery-controls{margin:0}.grocery-import-tools .footnote{margin:8px 0 0}';
  document.head.appendChild(style);
  const validPage = (id) => !!document.getElementById(id)?.classList.contains('page');

  // Android/browser Back: move between app sections instead of exiting immediately.
  const oldGo = window.go;
  if (typeof oldGo === 'function') {
    window.go = function (page, fromHistory) {
      if (!validPage(page)) return oldGo(page);
      const current = document.querySelector('.page.active')?.id || 'dashboard';
      if (page === current) return;
      if (!fromHistory) {
        try { history.pushState({ gharkhataPage: page }, '', location.href); } catch (_) {}
      }
      $$('.page').forEach(p => p.classList.toggle('active', p.id === page));
      $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === page));
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (page === 'reports' && typeof window.renderReports === 'function') window.renderReports();
    };
    if (!window.__gharkhataBackReady) {
      window.__gharkhataBackReady = true;
      history.replaceState({ gharkhataPage: document.querySelector('.page.active')?.id || 'dashboard' }, '', location.href);
      window.addEventListener('popstate', e => {
        if ($('#modalRoot') && !$('#modalRoot').hidden) {
          if (typeof window.closeModal === 'function') window.closeModal();
          history.replaceState({ gharkhataPage: document.querySelector('.page.active')?.id || 'dashboard' }, '', location.href);
          return;
        }
        const page = e.state?.gharkhataPage;
        if (validPage(page)) window.go(page, true);
        else window.go('dashboard', true);
      });
    }
  }

  // Make optional fields collapsible, while keeping the stored field names unchanged.
  const oldOpenModal = window.openModal;
  if (typeof oldOpenModal === 'function') {
    window.openModal = function (...args) {
      const result = oldOpenModal.apply(this, args);
      const kind = args[0];
      if (kind !== 'transaction' && kind !== 'farmTransaction') return result;
      const fields = $('#modalFields');
      if (!fields || fields.querySelector('.more-details')) return result;
      const optionalNames = ['person', 'title', 'notes'];
      const optional = optionalNames.map(n => fields.querySelector('.field [name="' + n + '"]')?.closest('.field')).filter(Boolean);
      if (optional.length) {
        const details = document.createElement('details');
        details.className = 'more-details';
        const summary = document.createElement('summary');
        summary.textContent = say('अधिक विवरण', 'More details');
        details.appendChild(summary);
        optional.forEach(el => details.appendChild(el));
        fields.appendChild(details);
      }
      return result;
    };
  }

  // Normalize legacy saved units, without deleting or resetting existing grocery data.
  function unitValue(value) {
    const x = String(value || '').trim().toLowerCase();
    if (['kg', 'kilogram', 'kilograms', 'kgs', 'किलोग्राम'].includes(x)) return 'kg';
    if (['g', 'gram', 'grams', 'gm', 'ग्राम'].includes(x)) return 'g';
    if (['l', 'liter', 'litre', 'liters', 'litres', 'लीटर'].includes(x)) return 'l';
    if (['ml', 'milliliter', 'millilitre', 'milliliters', 'millilitres', 'मिलीलीटर'].includes(x)) return 'ml';
    if (['packet', 'packets', 'pkt', 'पैकेट'].includes(x)) return 'Packet';
    if (['रुपये के हिसाब से', 'by amount', 'rupee', 'rupees', 'रुपये', '₹'].includes(x)) return 'रुपये';
    if (['pcs', 'pc', 'piece', 'pieces', 'पीस'].includes(x)) return 'PCS';
    return 'PCS';
  }
  const oldRenderGrocery = window.renderGrocery;
  if (typeof oldRenderGrocery === 'function') {
    window.renderGrocery = function () {
      const month = $('#groceryMonth');
      if (!month) return;
      if (!month.value && typeof window.currentMonth === 'function') month.value = window.currentMonth();
      const rows = window.groceryRows || Array.from({length:50}, (_,i)=>({no:i+1,item:'',qty:'',unit:'PCS',price:''}));
      const units = hi()
        ? [['g','ग्राम'],['kg','kg'],['l','लीटर'],['ml','ml'],['PCS','PCS'],['Packet','पैकेट'],['रुपये','रुपये']]
        : [['g','Gram'],['kg','kg'],['l','Litre'],['ml','ml'],['PCS','PCS'],['Packet','Packet'],['रुपये','Rupees']];
      $('#groceryRows').innerHTML = rows.map((r,i) => {
        const unit = unitValue(r.unit);
        const esc = window.escapeHtml || (v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
        return `<tr><td>${i+1}</td><td><input data-grocery="item" data-i="${i}" value="${esc(r.item||'')}" aria-label="${say('सामान','Item')} ${i+1}" placeholder="${say('सामान का नाम','Item name')}"></td><td><input data-grocery="qty" data-i="${i}" type="number" min="0" step="any" value="${esc(r.qty||'')}" aria-label="${say('मात्रा','Quantity')}"></td><td><select data-grocery="unit" data-i="${i}">${units.map(([v,label])=>`<option value="${v}" ${v===unit?'selected':''}>${label}</option>`).join('')}</select></td><td><input data-grocery="price" data-i="${i}" type="number" min="0" step="0.01" value="${esc(r.price||'')}" placeholder="${say('वैकल्पिक','Optional')}" aria-label="${say('कीमत','Price')}"></td></tr>`;
      }).join('');
      if (typeof window.translateGrocery === 'function') window.translateGrocery();
      const hint = $('#groceryPdfHint');
      if (hint) hint.textContent = say('यूनिट: g, kg, l, ml, PCS, Packet या रुपये। फोटो से पढ़ी सूची सेव करने से पहले जाँचें।','Units: Gram, kg, Litre, ml, PCS, Packet or Rupees. Review imported items before saving.');
    };
  }
  const oldReadGroceryRows = window.readGroceryRows;
  if (typeof oldReadGroceryRows === 'function') {
    window.readGroceryRows = function () {
      return $$('#groceryRows tr').map((tr,i)=>({
        no:i+1,
        item:tr.querySelector('[data-grocery="item"]')?.value.trim() || '',
        qty:tr.querySelector('[data-grocery="qty"]')?.value || '',
        unit:unitValue(tr.querySelector('[data-grocery="unit"]')?.value || 'PCS'),
        price:tr.querySelector('[data-grocery="price"]')?.value || ''
      }));
    };
  }

  // OCR: read a photo (camera or gallery) using Tesseract.js; text/CSV can be imported directly.
  function status(text) { const el=$('#groceryReadStatus'); if(el) el.textContent=text; }
  function parseLine(line) {
    let text=String(line||'').trim();
    if(!text) return null;
    text=text.replace(/^\s*(?:[-*•]\s*|\d{1,3}\s*[.)、:-]\s*)/,'').trim();
    if(/^(item|item name|सामान का नाम|क्रमांक|क्र\.?|quantity|मात्रा|price|कीमत)$/i.test(text)) return null;
    let qty='', unit='PCS', price='';
    const m=text.match(/(\d+(?:[.,]\d+)?)\s*(kilograms?|kgs?|grams?|gm|litres?|liters?|millilitres?|milliliters?|ml|pcs?|pieces?|packets?|pkt|kg|g|l|किलोग्राम|ग्राम|लीटर|मिलीलीटर|पैकेट|पीस)(?:\b|(?=\s|$))/i);
    if(m){
      qty=m[1].replace(',','.');
      const u=m[2].toLowerCase();
      unit=/^(kg|kilogram|kilograms|kgs|किलोग्राम)$/.test(u)?'kg':/^(g|gram|grams|gm|ग्राम)$/.test(u)?'g':/^(l|liter|litre|liters|litres|लीटर)$/.test(u)?'l':/^(ml|milliliter|millilitre|milliliters|millilitres|मिलीलीटर)$/.test(u)?'ml':/^(packet|packets|pkt|पैकेट)$/.test(u)?'Packet':'PCS';
      text=text.replace(m[0],' ').trim();
    }
    const pm=text.match(/(?:₹|rs\.?\s*)\s*(\d+(?:[.,]\d{1,2})?)\s*$/i);
    if(pm){price=pm[1].replace(',','.');text=text.slice(0,pm.index).trim();}
    text=text.replace(/[|,;:–—-]+\s*$/,'').trim();
    return text.length>1?{item:text,qty,unit,price}:null;
  }
  function importText(text) {
    const parsed=String(text).split(/\r?\n/).map(parseLine).filter(Boolean);
    if(!parsed.length){status(say('लिस्ट पढ़ी नहीं जा सकी। साफ फोटो या टेक्स्ट/CSV फ़ाइल आज़माएँ।','No items found. Try a clearer photo or text/CSV file.'));return;}
    const current=typeof window.readGroceryRows==='function'?window.readGroceryRows():[];
    if(current.some(r=>r.item||r.qty||r.price)&&!confirm(say('मौजूदा लिस्ट में सामान है। क्या उसे नई लिस्ट से बदलना है?','The current list has items. Replace it with the imported list?')))return;
    const rows=parsed.map((r,i)=>({no:i+1,...r}));
    while(rows.length<50) rows.push({no:rows.length+1,item:'',qty:'',unit:'PCS',price:''});
    window.groceryRows=rows;
    if(typeof window.renderGrocery==='function') window.renderGrocery();
    if(typeof window.saveGrocery==='function') window.saveGrocery(true);
    status(say(`${parsed.length} सामान मिले। नाम, मात्रा और यूनिट जाँचकर “लिस्ट सेव करें” दबाएँ.`,`${parsed.length} items found. Review names, quantities and units, then tap “Save list”.`));
  }
  let ocrPromise;
  function loadOCR(){
    if(window.Tesseract)return Promise.resolve(window.Tesseract);
    if(ocrPromise)return ocrPromise;
    ocrPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
      script.onload=()=>window.Tesseract?resolve(window.Tesseract):reject(Error('OCR unavailable'));
      script.onerror=()=>reject(Error('OCR download failed'));
      document.head.appendChild(script);
    });
    return ocrPromise;
  }
  async function readPhoto(file){
    if(!file)return;
    status(say('फोटो पढ़ी जा रही है…','Reading photo…'));
    try{
      const T=await loadOCR();
      const result=await T.recognize(file,'eng+hin',{logger:m=>{if(m.status==='recognizing text')status(say('फोटो पढ़ी जा रही है: ','Reading photo: ')+Math.round((m.progress||0)*100)+'%')}});
      importText(result.data.text);
    }catch(e){status(say('फोटो पढ़ने के लिए इंटरनेट चाहिए। इंटरनेट चालू करें या टेक्स्ट/CSV फ़ाइल चुनें।','Photo reading needs internet. Connect or choose a text/CSV file.'));}
  }
  function setupImport(){
    $('#readGroceryPhoto')?.addEventListener('click',()=>$('#groceryPhotoInput')?.click());
    $('#readGroceryFile')?.addEventListener('click',()=>$('#groceryFileInput')?.click());
    $('#groceryPhotoInput')?.addEventListener('change',e=>{readPhoto(e.target.files?.[0]);e.target.value='';});
    $('#groceryFileInput')?.addEventListener('change',e=>{
      const file=e.target.files?.[0]; if(!file)return;
      if(file.type.startsWith('image/')) readPhoto(file);
      else {const reader=new FileReader();reader.onload=()=>importText(reader.result||'');reader.onerror=()=>status(say('फ़ाइल नहीं पढ़ी जा सकी।','Could not read file.'));reader.readAsText(file);}
      e.target.value='';
    });
  }

  // Compact A4 grocery PDF: tighter rows, stronger type, smaller footer/QR.
  window.printGroceryPdf = function () {
    const rows = typeof window.readGroceryRows === 'function' ? window.readGroceryRows().filter(r => r.item || r.qty || r.price) : [];
    const title = say('मासिक किराना सूची', 'Monthly Grocery List');
    const month = $('#groceryMonth')?.value || '';
    const esc = window.escapeHtml || (v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
    const unitMap = {'Gram':say('ग्राम','Gram'),'Kilogram':'kg','Liter':say('लीटर','Litre'),'Litre':say('लीटर','Litre'),'Milliliter':'ml','रुपये के हिसाब से':say('रुपये','Rupees'),'रुपये':say('रुपये','Rupees'),'Packet':say('पैकेट','Packet'),'PCS':'PCS','g':say('ग्राम','Gram'),'kg':'kg','l':say('लीटर','Litre'),'ml':'ml'};
    const body = rows.map((r,i)=>`<tr><td class="num">${i+1}</td><td class="item">${esc(r.item)}</td><td class="qty">${esc(r.qty)}</td><td class="unit">${esc(unitMap[r.unit]||r.unit||'')}</td><td class="price">${esc(r.price)}</td></tr>`).join('');
    const w = window.open('', '_blank');
    if (!w) { if(typeof window.toast==='function')window.toast(say('पॉप-अप की अनुमति दें','Allow pop-ups to create PDF')); return; }
    w.document.write(`<!doctype html><html lang="${hi()?'hi':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GharKhata - ${esc(title)}</title><style>
      @page{size:A4 portrait;margin:7mm}
      *{box-sizing:border-box}
      body{font-family:Arial,'Noto Sans Devanagari',sans-serif;color:#17231f;margin:0;padding:0;font-size:14px;font-weight:650}
      header{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;border-bottom:2px solid #155e4b;padding:0 0 5px;margin:0 0 8px}
      h1{font-size:22px;line-height:1.1;color:#155e4b;margin:0;font-weight:900}
      .meta{font-size:12px;font-weight:700;margin-top:3px}
      .stamp{font-size:11px;color:#526158;font-weight:700;text-align:right}
      table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:14px;line-height:1.15}
      th,td{border:1px solid #b8c9bf;padding:4px 6px;text-align:left;overflow-wrap:anywhere;vertical-align:middle}
      th{background:#edf5f0;color:#155e4b;font-weight:900;font-size:13px}
      tbody tr{break-inside:avoid;page-break-inside:avoid}
      td{font-weight:700}
      .num{width:8%;text-align:center}.item{width:42%}.qty{width:15%;text-align:center}.unit{width:18%}.price{width:17%;text-align:right}
      .footer{display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #cbd8d0;margin-top:8px;padding-top:5px;font-size:10px;font-weight:650;break-inside:avoid}
      .footer strong{font-size:11px;font-weight:900;color:#155e4b}
      .footer img{width:42px;height:42px;object-fit:contain}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body>
      <header><div><h1>GharKhata</h1><div class="meta">${esc(title)}</div></div><div class="stamp">${esc(month)}</div></header>
      <table><thead><tr><th class="num">${say('क्र.','No.')}</th><th class="item">${say('सामान का नाम','Item name')}</th><th class="qty">${say('मात्रा','Qty')}</th><th class="unit">${say('यूनिट','Unit')}</th><th class="price">${say('रुपये','Rupees')}</th></tr></thead><tbody>${body||`<tr><td colspan="5">${say('कोई सामान दर्ज नहीं है','No items entered')}</td></tr>`}</tbody></table>
      <div class="footer"><div><strong>GharKhata</strong><br>${say('घर का हर खर्च, एक जगह','Every household expense, in one place')}</div><img src="${(window.APP_URL||location.origin+location.pathname).replace(/\/?$/,'/')}app-qr.png" alt="QR"></div>
      <script>window.onload=()=>setTimeout(()=>window.print(),250)<\/script></body></html>`);
    w.document.close();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupImport); else setupImport();
})();
