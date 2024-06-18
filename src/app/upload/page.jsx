"use client"
import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('image', selectedFile);
			formData.append('name', name);
			formData.append('username', username);

			try {
				const response = await axios.post('http://localhost:3000/api/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				console.log(response.data);
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	};

	return (
		<div>
			<input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
			<input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default UploadImage;
