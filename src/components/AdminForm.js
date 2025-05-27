import { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminForm.css';

function AdminForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fullImageUrl, setFullImageUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!name || !description || !thumbnail || !fullImage) {
      setStatus('⚠️ Please fill out all fields.');
      return;
    }

    try {
      setStatus('Uploading thumbnail...');
      const thumbRef = ref(storage, `thumbnails/${thumbnail.name}`);
      await uploadBytes(thumbRef, thumbnail);
      const thumbUrl = await getDownloadURL(thumbRef);
      setThumbnailUrl(thumbUrl);
      console.log('Thumbnail uploaded:', thumbUrl);

      setStatus('Uploading full image...');
      const imageRef = ref(storage, `images/${fullImage.name}`);
      await uploadBytes(imageRef, fullImage);
      const imageUrl = await getDownloadURL(imageRef);
      setFullImageUrl(imageUrl);
      console.log('Full image uploaded:', imageUrl);

      setStatus('Saving to Firestore...');
      await addDoc(collection(db, 'skateboards'), {
        name,
        description,
        thumbnailUrl: thumbUrl,
        imageUrl,
        createdAt: new Date()
      });

      setStatus('✅ Upload successful!');
      setName('');
      setDescription('');
      setThumbnail(null);
      setFullImage(null);
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setStatus('❌ Upload failed.');
    }
  };

  return (
    <form onSubmit={handleUpload} className="form-wrapper">
      <h2>Add a Skateboard</h2>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />

      <label>Thumbnail Image: </label>
      <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} /><br />
      {thumbnail && <p>Selected thumbnail: {thumbnail.name}</p>}

      <label>Full Image: </label>
      <input type="file" accept="image/*" onChange={(e) => setFullImage(e.target.files[0])} /><br />
      {fullImage && <p>Selected full image: {fullImage.name}</p>}

      <button type="submit">Upload</button>
      <p>{status}</p>

      {thumbnailUrl && (
        <div>
          <p>Thumbnail Preview:</p>
          <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '200px' }} />
        </div>
      )}
      {fullImageUrl && (
        <div>
          <p>Full Image Preview:</p>
          <img src={fullImageUrl} alt="Full" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </form>
  );
}

export default AdminForm;
