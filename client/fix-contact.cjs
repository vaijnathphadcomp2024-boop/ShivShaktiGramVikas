const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/Contact.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace(
  "import PageHero from '../components/PageHero';",
  "import PageHero from '../components/PageHero';\nimport { useState, useEffect } from 'react';\nimport { db } from '../firebase';\nimport { doc, getDoc } from 'firebase/firestore';"
);

// 2. Add state and fetch logic
const componentStart = "export default function Contact() {";
const hookLogic = `export default function Contact() {
  const [bankDetails, setBankDetails] = useState({
    accountName: '', accountNumber: '', ifscCode: '', bankName: '', branch: '', accountType: '', upiId: '', qrUrl: ''
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const docRef = doc(db, 'settings', 'bankDetails');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBankDetails(docSnap.data());
        }
      } catch (e) { console.error(e); }
    };
    fetchBankDetails();
  }, []);
`;
content = content.replace(componentStart, hookLogic);

// 3. Replace Bank Details List
const bankListRegex = /<dl className="space-y-4">\s*{?\/\*.*?\*\/}*?[\s\S]*?<\/dl>/;
if (bankListRegex.test(content)) {
  const bankListReplace = `<dl className="space-y-4">
                  {[
                    { dt: 'Account Name',   dd: bankDetails.accountName || 'Not available' },
                    { dt: 'Account No.',    dd: bankDetails.accountNumber || 'Not available', copy: true },
                    { dt: 'IFSC Code',      dd: bankDetails.ifscCode || 'Not available', copy: true },
                    { dt: 'Bank Name',      dd: bankDetails.bankName || 'Not available' },
                    { dt: 'Branch',         dd: bankDetails.branch || 'Not available' },
                    { dt: 'Account Type',   dd: bankDetails.accountType || 'Not available' },
                  ].map(({ dt, dd, copy }) => (
                    <div key={dt} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-2 border-b border-gray-100 last:border-0">
                      <dt className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dt}</dt>
                      <dd className="font-semibold text-navy text-sm flex items-center gap-3">
                        {dd}
                        {copy && dd !== 'Not available' && (
                          <CopyButton text={dd} label={dt === 'Account No.' ? 'Acc No.' : 'IFSC'} />
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>`;
  content = content.replace(bankListRegex, bankListReplace);
}

// 4. Replace QR Code Image
const qrImageRegex = /{?\/\* QR placeholder \*\/}*?[\s\S]*?<\/div>\s*<p className="text-xs text-gray-400 text-center leading-tight mt-3">/;
if (qrImageRegex.test(content)) {
  const qrImageReplace = `<div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-4">
                  {bankDetails.qrUrl ? (
                    <img src={bankDetails.qrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl text-gray-300">📱</span>
                      <p className="text-xs text-gray-400 mt-2 font-medium">QR Code<br/>Not available</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center leading-tight mt-3">`;
  content = content.replace(qrImageRegex, qrImageReplace);
}

// 5. Replace UPI ID
const upiRegex = /{?\/\* TODO: Add real bank details, UPI ID, QR code image \*\/}*?[\s\S]*?<CopyButton text="\[upiid@bank - Placeholder\]" label="UPI ID" \/>/;
if (upiRegex.test(content)) {
  const upiReplace = `<p className="font-bold text-navy text-sm">{bankDetails.upiId || 'Not available'}</p>
                    {bankDetails.upiId && <CopyButton text={bankDetails.upiId} label="UPI ID" />}`;
  content = content.replace(upiRegex, upiReplace);
}

fs.writeFileSync(file, content);
console.log('Contact patched');
