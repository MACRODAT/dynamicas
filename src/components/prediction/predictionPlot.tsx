import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import JSZip from 'jszip';
import axios from 'axios';
import { afterRequest, generateConfigToken, remote_addr } from '../../firebase';


const PredictionPlot: React.FC<States> = (state: States) => {
	const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [url_CL, setUrlCL] = useState("");

	useEffect(() => {
		const config = generateConfigToken(state.user.jwt_token_);
		axios.get(`http://${remote_addr}/myprojects/${state.user.project}/prediction/plots`, {
				...config,
				responseType: 'blob'
			})
			.then(async (res) => {
				afterRequest(res);
				const zip = await JSZip.loadAsync(res.data); // Load ZIP file from response
				const urls = await Promise.all(
					Object.keys(zip.files).map(async (filename) => {
						const fileData = await zip.files[filename].async("blob"); // Extract as Blob
						return URL.createObjectURL(fileData); // Create URL for display
					})
				);
				setImageUrls(urls); // Store all image URLs in state for rendering
			})
			.catch((err) => {
				afterRequest(err);
				console.error("Error fetching images:", err);
			});
	}, [state.params.updateCount])

	
	

return (
		<div className='blendWithImages'>
			<h3>Airfoil performance prediction plots</h3>
			<div
				style={{filter: 'invert(1)'}}
			>
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`plot ${index + 1}`} style={{ maxWidth: '100%', margin: '10px' }} />
                ))}
            </div>
		</div>
	)
}

export default connect(allInterfaces)(PredictionPlot)
