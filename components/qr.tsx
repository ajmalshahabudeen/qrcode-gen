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
import { Input } from "@/components/ui/input"
import { ColorPicker, IColor, useColor } from "react-color-palette"
import "react-color-palette/css"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

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
		setDotType,
		setCornersSquareType,
		setCornersDotType,
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
	const [colorDot, setColorDot] = useColor("#000000")
	const [colorCorner, setColorCorner] = useColor("#000000")
	const [colorCornerDot, setColorCornerDot] = useColor("#000000")

	const handleBg = (color: IColor) => setBackgroundColor(color.hex)
	const handleDot = (color: IColor) => setDotsColor(color.hex)
	const handleCorner = (color: IColor) => setCornersColor(color.hex)
	const handleCornerDot = (color: IColor) => setCornersDotColor(color.hex)

	return (
		<div className='flex flex-col'>
			<h2 className='text-2xl font-bold text-center'>Your QR Code</h2>
			<hr className='my-5' />
			<div ref={ref} className='flex w-full justify-center'>
				Loading
			</div>
			<div className='flex flex-col items-center gap-5 pt-5'>
				<Input
					className='w-full md:w-[400px] text-center'
					value={options.data}
					onChange={onDataChange}
					placeholder='Website, text, etc'
				/>
				<hr className='my-5 bg-primary h-0.5 md:hidden w-full' />
				<div className='flex flex-wrap justify-center items-center w-full gap-5'>
					<p className='text-xl font-bold'>Edit Colors</p>
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
				<hr className='my-5 bg-primary h-0.5 md:hidden w-full' />

				<div className='flex flex-col md:flex-row justify-center items-center w-full gap-5'>
					<p className='text-xl font-bold'>Select QR Style</p>
					<Select
						onValueChange={setDotType}
						defaultValue={options.dotsOptions?.type}>
						<SelectTrigger className='w-full md:w-[180px]'>
							<SelectValue placeholder='Dot style' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='dots'>Dots</SelectItem>
							<SelectItem value='rounded'>Rounded</SelectItem>
							<SelectItem value='classy'>Classy</SelectItem>
							<SelectItem value='classy-rounded'>
								Classy Rounded
							</SelectItem>
							<SelectItem value='square'>Square</SelectItem>
							<SelectItem value='extra-rounded'>
								Extra Rounded
							</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={setCornersSquareType}
						defaultValue={options.cornersSquareOptions?.type}>
						<SelectTrigger className='w-full md:w-[180px]'>
							<SelectValue placeholder='Corner style' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='dot'>Dot</SelectItem>
							<SelectItem value='square'>Square</SelectItem>
							<SelectItem value='extra-rounded'>
								Extra Rounded
							</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={setCornersDotType}
						defaultValue={options.cornersDotOptions?.type}>
						<SelectTrigger className='w-full md:w-[180px]'>
							<SelectValue placeholder='Corners dot style' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='dot'>Dot</SelectItem>
							<SelectItem value='square'>Square</SelectItem>
						</SelectContent>
					</Select>
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
						className='inline-flex items-center gap-2 w-full md:w-auto place-content-center'>
						Download <RxDownload />
					</Button>
				</div>
			</div>
		</div>
	)
}
