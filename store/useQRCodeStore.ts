import { create } from "zustand"
import QRCodeStyling, { Options } from "qr-code-styling"

interface QRCodeState {
	qrCode: QRCodeStyling | null
	initializeQRCode: (options: Options) => void
}

export const useQRCodeStore = create<QRCodeState>((set) => ({
	qrCode: null,
	initializeQRCode: (options) => {
		const instance = new QRCodeStyling(options)
		set({ qrCode: instance })
	},
}))
