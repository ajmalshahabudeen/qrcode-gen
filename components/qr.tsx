"use client"
import React, { useEffect, useRef, ChangeEvent } from "react"

import { RxDownload } from "react-icons/rx"
import { Extension, useOptionsStore } from "@/store/useOptionsStore"
import { useQRCodeStore } from "@/store/useQRCodeStore"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { ColorPicker, IColor, useColor } from "react-color-palette"
import "react-color-palette/css"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet"

// Define Extension type explicitly since it's not exported from the package

export default function QRC() {
	const ref = useRef<HTMLDivElement>(null)
	const {
		options,
		setOptions,
		fileExt,
		setFileExt,
		setBackgroundColor,
		setDotsColor,
		setCornersColor,
		setCornersDotColor,
		resetColors,
	} = useOptionsStore()
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

	const onExtensionChange = (valve: string) => {
		setFileExt(valve as Extension)
	}

	const onDownloadClick = () => {
		if (qrCode) {
			qrCode.download({ extension: fileExt })
		}
	}

	//color logic
	const [colorBg, setColorBg] = useColor("#ffffff")
	const [colorDot, setColorDot] = useColor("#ffffff")
	const [colorCorner, setColorCorner] = useColor("#ffffff")
	const [colorCornerDot, setColorCornerDot] = useColor("#ffffff")

	const handleBg = (color: IColor) => setBackgroundColor(color.hex)
	const handleDot = (color: IColor) => setDotsColor(color.hex)
	const handleCorner = (color: IColor) => setCornersColor(color.hex)
	const handleCornerDot = (color: IColor) => setCornersDotColor(color.hex)

	return (
		<div className='flex flex-col'>
			<h2>Your QR Code</h2>
			<hr className='my-5' />
			<div ref={ref}>Loading</div>
			<div className='flex flex-col gap-5 pt-5'>
				<Input
					value={options.data}
					onChange={onDataChange}
					placeholder='Website, text, etc'
				/>
				<div className='flex flex-col md:flex-row justify-center items-center w-full gap-5'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant={"outline"}
								className='w-full md:w-[240px]'>
								Change Background Color
							</Button>
						</SheetTrigger>
						<SheetContent
							side='bottom'
							className='w-full md:w-[400px] place-self-center rounded-t-2xl'>
							<SheetHeader>
								<SheetTitle className='text-center '>
									You are now changing background
								</SheetTitle>
								<hr className='my-5 bg-red-500' />
								{/* <SheetDescription> */}
								<ColorPicker
									color={colorBg}
									onChange={setColorBg}
									onChangeComplete={handleBg}
								/>
								{/* </SheetDescription> */}
							</SheetHeader>
						</SheetContent>
					</Sheet>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant={"outline"}
								className='w-full md:w-[240px]'>
								Change Dots Color
							</Button>
						</SheetTrigger>
						<SheetContent
							side='bottom'
							className='w-full md:w-[400px] place-self-center rounded-t-2xl'>
							<SheetHeader>
								<SheetTitle className='text-center '>
									You are now changing dots
								</SheetTitle>
								<hr className='my-5 bg-red-500' />
								<ColorPicker
									color={colorDot}
									onChange={setColorDot}
									onChangeComplete={handleDot}
								/>
							</SheetHeader>
						</SheetContent>
					</Sheet>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant={"outline"}
								className='w-full md:w-[240px]'>
								Change Corners Color
							</Button>
						</SheetTrigger>
						<SheetContent
							side='bottom'
							className='w-full md:w-[400px] place-self-center rounded-t-2xl'>
							<SheetHeader>
								<SheetTitle className='text-center '>
									You are now changing corners
								</SheetTitle>
								<hr className='my-5 bg-red-500' />
								<ColorPicker
									color={colorCorner}
									onChange={setColorCorner}
									onChangeComplete={handleCorner}
								/>
							</SheetHeader>
						</SheetContent>
					</Sheet>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant={"outline"}
								className='w-full md:w-[240px]'>
								Change Corners Dot Color
							</Button>
						</SheetTrigger>
						<SheetContent
							side='bottom'
							className='w-full md:w-[400px] place-self-center rounded-t-2xl'>
							<SheetHeader>
								<SheetTitle className='text-center '>
									You are now changing corners dot
								</SheetTitle>
								<hr className='my-5 bg-red-500' />
								<ColorPicker
									color={colorCornerDot}
									onChange={setColorCornerDot}
									onChangeComplete={handleCornerDot}
								/>
							</SheetHeader>
						</SheetContent>
					</Sheet>
					<Button
						variant={"outline"}
						className='w-full md:w-[240px]'
						onClick={resetColors}>
						Reset Colors
					</Button>
				</div>
				<div className='flex flex-col md:flex-row justify-center items-center w-full gap-5'>
					<Select
						onValueChange={onExtensionChange}
						defaultValue={fileExt}>
						<SelectTrigger className='w-full md:w-[180px]'>
							<SelectValue placeholder='File format' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='svg'>SVG</SelectItem>
							<SelectItem value='png'>PNG</SelectItem>
							<SelectItem value='jpeg'>JPEG</SelectItem>
							<SelectItem value='webp'>WEBP</SelectItem>
						</SelectContent>
					</Select>
					<Button
						onClick={onDownloadClick}
						className='inline-flex items-center gap-2 place-content-center'>
						Download <RxDownload />
					</Button>
				</div>
			</div>
		</div>
	)
}
