import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

function TestUploader() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    try {
      setStatus('Uploading...');
      const fileRef = ref(storage, `test/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setUrl(downloadURL);
      setStatus('✅ Upload complete!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
      {url && <img src={url} alt="Uploaded" style={{ maxWidth: '300px' }} />}
    </div>
  );
}

export default TestUploader;
