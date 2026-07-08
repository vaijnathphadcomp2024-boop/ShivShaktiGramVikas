import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToImageKit, deleteFromImageKit } from '../../../utils/imagekit';

export default function ContactTab() {
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    accountType: '',
    upiId: ''
  });
  const [qrFile, setQrFile] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const docRef = doc(db, 'settings', 'bankDetails');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBankDetails(data);
        if (data.qrUrl) setQrUrl(data.qrUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let currentQrUrl = qrUrl;
      let currentQrFileId = bankDetails.qrImagekitFileId || null;

      // If new file selected, upload it
      if (qrFile) {
        const result = await uploadToImageKit(qrFile, '/shivshakti/settings');
        currentQrUrl = result.url;
        currentQrFileId = result.fileId;
        setQrUrl(currentQrUrl);
        
        // Delete old QR from ImageKit if it exists
        if (bankDetails.qrImagekitFileId) {
          await deleteFromImageKit(bankDetails.qrImagekitFileId);
        }
      }

      await setDoc(doc(db, 'settings', 'bankDetails'), {
        ...bankDetails,
        qrUrl: currentQrUrl,
        qrImagekitFileId: currentQrFileId,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      alert('Bank details updated successfully!');
      setQrFile(null); // Clear file input
    } catch (error) {
      console.error(error);
      alert('Error updating details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-extrabold text-navy border-b pb-2">Manage Bank & Payment Details</h2>

      <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Account Name</label>
          <input type="text" name="accountName" value={bankDetails.accountName} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Account Number</label>
          <input type="text" name="accountNumber" value={bankDetails.accountNumber} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">IFSC Code</label>
          <input type="text" name="ifscCode" value={bankDetails.ifscCode} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Name</label>
          <input type="text" name="bankName" value={bankDetails.bankName} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch</label>
          <input type="text" name="branch" value={bankDetails.branch} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Account Type (Savings/Current)</label>
          <input type="text" name="accountType" value={bankDetails.accountType} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2 border-t pt-4 mt-2">
          <h3 className="font-bold text-navy mb-4">UPI & QR Code</h3>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">UPI ID</label>
          <input type="text" name="upiId" value={bankDetails.upiId} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Upload QR Code Image</label>
          <input type="file" accept="image/*" onChange={e => setQrFile(e.target.files[0])} className="border p-1.5 rounded w-full bg-white" />
          {qrUrl && <div className="mt-2 text-xs text-green-600">Current QR Code: <a href={qrUrl} target="_blank" rel="noreferrer" className="underline">View Image</a></div>}
        </div>

        <div className="md:col-span-2 mt-4">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-saffron text-white font-bold rounded hover:bg-orange-500 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save All Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
