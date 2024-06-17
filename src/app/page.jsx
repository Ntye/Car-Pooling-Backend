'use client'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default function Home() {
	const [uploading, setUploading] = useState(false)
	const [selectedImage, setSelectedImage] = useState("")
	const [selectedFile, setSelectedFile] = useState()

	const handleUpload = async () => {
		setUploading(true);
		try {
			if (!selectedFile) return;
			const formData = new FormData();
			formData.append("myImage", selectedFile);
			const {data} = await axios.post("/api/image", formData);
			console.log(data);
		} catch (error) {
			console.log(error.response?.data);
		}
		setUploading(false);
	}

  return (
    <main className="main">
      Helloooooooooooooo
	    <label>
		    <input
			    type="file"
			    hidden
			    onChange={({ target }) => {
						if (target.files) {
							const file = target.files[0];
							setSelectedImage(URL.createObjectURL(file));
							setSelectedFile(file);
						}
			    }}
		    />
		    <div>
			    {selectedImage ? (
				    <img src={selectedImage} alt=""/>
			    ) : (
				    <span>Select Image</span>
			    )}
		    </div>
	    </label>
	    <Button
		    disabled={uploading}
		    style={{ opacity: uploading ? '.5' : '1' }}
		    onClick={handleUpload}
	    >
		    {uploading ? 'Uploading..' : 'Upload'}
	    </Button>
    </main>
  );
}

function convertToBase64(file){
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result)
		};
		fileReader.onerror = (error) => {
			reject(error)
		};
	})
}