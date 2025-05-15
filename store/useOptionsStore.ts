import { Options } from 'qr-code-styling'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define your types
export type Extension = 'svg' | 'png' | 'jpeg'
export type DrawType = 'svg' | 'canvas'
export type TypeNumber = number
export type Mode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji'
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
export type DotType = 'rounded' | 'dots' | 'classy' | string
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded'
export type CornerDotType = 'dot' | 'square'



interface OptionsState {
  options: Options
  setOptions: (newOptions: Partial<Options>) => void
  replaceOptions: (allOptions: Options) => void
  fileExt: Extension
  setFileExt: (ext: Extension) => void
}

export const useOptionsStore = create<OptionsState>()(
  persist(
    (set) => ({
      options: {
        width: 300,
        height: 300,
        type: 'svg',
        data: 'http://your-website.com',
        image: '/favicon.ico',
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q',
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 20,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          color: '#222222',
          type: 'rounded',
        },
        backgroundOptions: {
          color: '#5FD4F3',
        },
        cornersSquareOptions: {
          color: '#222222',
          type: 'extra-rounded',
        },
        cornersDotOptions: {
          color: '#222222',
          type: 'dot',
        },
      },
      setOptions: (newOptions) =>
        set((state) => ({
          options: { ...state.options, ...newOptions },
        })),
      replaceOptions: (allOptions) => set({ options: allOptions }),
      fileExt: 'svg',
      setFileExt: (ext) => set({ fileExt: ext }),
    }),
    {
      name: 'qr-options-storage',
    }
  )
)
