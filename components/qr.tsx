"use client"
import React, { useEffect, useRef, ChangeEvent } from "react"

import { RxDownload } from "react-icons/rx"
import { Extension, useOptionsStore } from "@/store/useOptionsStore"
import { useQRCodeStore } from "@/store/useQRCodeStore"

// Define Extension type explicitly since it's not exported from the package

export default function QRC() {
	const ref = useRef<HTMLDivElement>(null)
	const { options, setOptions, fileExt, setFileExt } = useOptionsStore()
	const { qrCode, initializeQRCode } = useQRCodeStore()

	// Initialize the QR code instance once
	useEffect(() => {
		initializeQRCode(options)
	}, [initializeQRCode, options])

	// Append to DOM after QR code instance is available
	useEffect(() => {
		if (ref.current && qrCode) {
			qrCode.append(ref.current)
		}
	}, [qrCode])

	// Update QR code when options change
	useEffect(() => {
		if (qrCode) {
			qrCode.update(options)
		}
	}, [options, qrCode])

	// Handlers
	const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
		setOptions({ data: event.target.value })
	}

	const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFileExt(event.target.value as Extension)
	}

	const onDownloadClick = () => {
		if (qrCode) {
			qrCode.download({ extension: fileExt })
		}
	}

	return (
		<div className='flex flex-col'>
			<h2>Your QR Code</h2>
			<hr className='my-5' />
			<div ref={ref}>Loading</div>
			<div className='flex flex-col gap-5 pt-5'>
				<input
					value={options.data}
					onChange={onDataChange}
					className='border p-2 rounded-md'
				/>
				<select
					onChange={onExtensionChange}
					value={fileExt}
					className='border p-2 rounded-md'>
					<option value='svg'>SVG</option>
					<option value='png'>PNG</option>
					<option value='jpeg'>JPEG</option>
					<option value='webp'>WEBP</option>
				</select>
				<button
					onClick={onDownloadClick}
					className='border p-2 rounded-md inline-flex items-center gap-2 place-content-center'>
					Download <RxDownload />
				</button>
			</div>
		</div>
	)
}
