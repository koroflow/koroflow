import { ImageResponse } from 'next/og'
import React from 'react'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <svg width="32" height="32" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_104_5)">
          <g filter="url(#filter0_i_104_5)">
            <path d="M90 45C90 20.1472 69.8528 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8528 20.1472 90 45 90C69.8528 90 90 69.8528 90 45Z" fill="#18181B" />
            <path d="M90 45C90 20.1472 69.8528 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8528 20.1472 90 45 90C69.8528 90 90 69.8528 90 45Z" fill="white" fill-opacity="0.1" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M45.0001 19.875C42.6874 19.875 40.8126 21.7498 40.8126 24.0625C40.8126 26.3752 42.6874 28.25 45.0001 28.25C47.3128 28.25 49.1876 26.3752 49.1876 24.0625C49.1876 21.7498 47.3128 19.875 45.0001 19.875ZM35.2292 24.0625C35.2292 18.6662 39.6038 14.2917 45.0001 14.2917C50.3964 14.2917 54.7709 18.6662 54.7709 24.0625C54.7709 29.4588 50.3964 33.8333 45.0001 33.8333C43.3174 33.8333 41.7341 33.408 40.3518 32.6589L32.659 40.3517C32.9762 40.9371 33.2354 41.5585 33.4288 42.2083H56.5714C57.7726 38.1723 61.5114 35.2292 65.9376 35.2292C71.3339 35.2292 75.7084 39.6037 75.7084 45C75.7084 50.3963 71.3339 54.7708 65.9376 54.7708C64.2549 54.7708 62.6716 54.3455 61.2893 53.5964L53.5965 61.2892C54.3456 62.6715 54.7709 64.2548 54.7709 65.9375C54.7709 71.3338 50.3964 75.7083 45.0001 75.7083C39.6038 75.7083 35.2292 71.3338 35.2292 65.9375C35.2292 60.5412 39.6038 56.1667 45.0001 56.1667C46.6828 56.1667 48.2662 56.592 49.6485 57.3411L57.3412 49.6485C57.024 49.063 56.7648 48.4415 56.5714 47.7917H33.4288C32.2276 51.8277 28.4888 54.7708 24.0626 54.7708C18.6663 54.7708 14.2917 50.3963 14.2917 45C14.2917 39.6037 18.6663 35.2292 24.0626 35.2292C25.7453 35.2292 27.3287 35.6545 28.711 36.4036L36.4037 28.711C35.6546 27.3286 35.2292 25.7452 35.2292 24.0625ZM61.7501 45C61.7501 47.3127 63.6249 49.1875 65.9376 49.1875C68.2503 49.1875 70.1251 47.3127 70.1251 45C70.1251 42.6873 68.2503 40.8125 65.9376 40.8125C63.6249 40.8125 61.7501 42.6873 61.7501 45ZM24.0626 40.8125C26.3753 40.8125 28.2501 42.6873 28.2501 45C28.2501 47.3127 26.3753 49.1875 24.0626 49.1875C21.7499 49.1875 19.8751 47.3127 19.8751 45C19.8751 42.6873 21.7499 40.8125 24.0626 40.8125ZM40.8126 65.9375C40.8126 63.6248 42.6874 61.75 45.0001 61.75C47.3128 61.75 49.1876 63.6248 49.1876 65.9375C49.1876 68.2502 47.3128 70.125 45.0001 70.125C42.6874 70.125 40.8126 68.2502 40.8126 65.9375Z" fill="url(#paint0_linear_104_5)" fill-opacity="0.8" />
          </g>
        </g>
        <defs>
          <filter id="filter0_i_104_5" x="0" y="-9" width="90" height="99" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="-9" />
            <feGaussianBlur stdDeviation="9" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.64 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_104_5" />
          </filter>
          <linearGradient id="paint0_linear_104_5" x1="45.0001" y1="14.2916" x2="45.0001" y2="107.421" gradientUnits="userSpaceOnUse">
            <stop offset="0.313079" stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_104_5">
            <rect width="90" height="90" fill="white" />
          </clipPath>
        </defs>
      </svg>

    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}