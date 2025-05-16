import { Options } from "qr-code-styling"
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define your types
export type Extension = "svg" | "png" | "jpeg"
export type DrawType = "svg" | "canvas"
export type TypeNumber = number
export type Mode = "Numeric" | "Alphanumeric" | "Byte" | "Kanji"
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"
export type DotType = "rounded" | "dots" | "classy" | string
export type CornerSquareType = "dot" | "square" | "extra-rounded"
export type CornerDotType = "dot" | "square"

interface OptionsState {
	options: Options
	setOptions: (newOptions: Partial<Options>) => void
	replaceOptions: (allOptions: Options) => void
	fileExt: Extension
	setFileExt: (ext: Extension) => void
	setBackgroundColor: (color: string) => void
	setDotsColor: (color: string) => void
	setCornersColor: (color: string) => void
	setCornersDotColor: (color: string) => void
	resetColors: () => void
}

export const useOptionsStore = create<OptionsState>()(
	persist(
		(set) => ({
			options: {
				width: 300,
				height: 300,
				type: "svg",
				data: "http://your-website.com",
				// image: "/favicon.ico",
				margin: 10,
				qrOptions: {
					typeNumber: 0,
					mode: "Byte",
					errorCorrectionLevel: "Q",
				},
				imageOptions: {
					hideBackgroundDots: true,
					imageSize: 0.4,
					margin: 20,
					crossOrigin: "anonymous",
				},
				dotsOptions: {
					color: "#222222",
					type: "rounded",
				},
				backgroundOptions: {
					color: "#ffffff",
				},
				cornersSquareOptions: {
					color: "#222222",
					type: "extra-rounded",
				},
				cornersDotOptions: {
					color: "#222222",
					type: "dot",
				},
			},
			setOptions: (newOptions) =>
				set((state) => ({
					options: { ...state.options, ...newOptions },
				})),
			replaceOptions: (allOptions) => set({ options: allOptions }),
			fileExt: "svg",
			setFileExt: (ext) => set({ fileExt: ext }),
			setBackgroundColor: (color) =>
				set((state) => ({
					options: {
						...state.options,
						backgroundOptions: {
							...state.options.backgroundOptions,
							color: color,
						},
					},
				})),
			setDotsColor: (color) =>
				set((state) => ({
					options: {
						...state.options,
						dotsOptions: {
							...state.options.dotsOptions,
							color: color,
						},
					},
				})),
			setCornersColor: (color) =>
				set((state) => ({
					options: {
						...state.options,
						cornersSquareOptions: {
							...state.options.cornersSquareOptions,
							color: color,
						},
					},
				})),
			setCornersDotColor: (color) =>
				set((state) => ({
					options: {
						...state.options,
						cornersDotOptions: {
							...state.options.cornersDotOptions,
							color: color,
						},
					},
				})),
			resetColors: () =>
				set((state) => ({
					options: {
						...state.options,
						backgroundOptions: {
							...state.options.backgroundOptions,
							color: "#ffffff",
						},
						dotsOptions: {
							...state.options.dotsOptions,
							color: "#222222",
						},
						cornersSquareOptions: {
							...state.options.cornersSquareOptions,
							color: "#222222",
						},
						cornersDotOptions: {
							...state.options.cornersDotOptions,
							color: "#222222",
						},
					},
				})),
		}),

		{
			name: "qr-options-storage",
		}
	)
)
