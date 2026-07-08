/**
 * ImageKit.io Upload Utility
 * Uploads files directly to ImageKit via their REST API.
 * Uses Basic Auth with the private key (acceptable for admin-only panel).
 */

const IMAGEKIT_UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload';
const IMAGEKIT_API_URL = 'https://api.imagekit.io/v1/files';
const PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;

/**
 * Upload a file to ImageKit.
 * @param {File} file - The file to upload.
 * @param {string} folder - The folder path in ImageKit (e.g. '/galleries/preschool').
 * @param {function} onProgress - Optional progress callback (0-100).
 * @returns {Promise<{url: string, fileId: string, name: string}>}
 */
export async function uploadToImageKit(file, folder = '/', onProgress = null) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('folder', folder);
    formData.append('publicKey', PUBLIC_KEY);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', IMAGEKIT_UPLOAD_URL);

    // Basic Auth: base64(privateKey + ":")
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(PRIVATE_KEY + ':'));

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          url: data.url,
          fileId: data.fileId,
          name: data.name,
          thumbnailUrl: data.thumbnailUrl,
          width: data.width,
          height: data.height,
          size: data.size
        });
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.message || 'Upload failed'));
        } catch {
          reject(new Error('Upload failed with status ' + xhr.status));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });
}

/**
 * Delete a file from ImageKit.
 * @param {string} fileId - The file ID to delete.
 * @returns {Promise<void>}
 */
export async function deleteFromImageKit(fileId) {
  if (!fileId) return;
  const response = await fetch(`${IMAGEKIT_API_URL}/${fileId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Basic ' + btoa(PRIVATE_KEY + ':')
    }
  });

  if (!response.ok) {
    let errorMsg = 'Delete failed';
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch (e) {
      errorMsg += ` with status ${response.status}`;
    }
    console.error("ImageKit Delete Error:", errorMsg);
    // Don't throw to prevent blocking Firestore document deletion if image is already gone
  }
}

