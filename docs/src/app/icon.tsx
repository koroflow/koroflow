import { ImageResponse } from "next/og";
import React from "react";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
	return new ImageResponse(
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			width="32"
			height="32"
			viewBox="0 0 500 500"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_12_9)">
				<g filter="url(#filter0_i_12_9)">
					<rect width="500" height="500" rx="250" fill="#5C8BD6" />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M251.32 216.582C242.142 207.404 242.142 192.524 251.32 183.346L337.019 97.6472L353.637 114.265C362.815 123.443 362.815 138.323 353.637 147.5L267.938 233.199L251.32 216.582ZM174.443 173.706L138.096 141.384L121.63 159.901C113.474 169.073 114.297 183.119 123.469 191.275L171.223 233.74L174.443 173.706ZM231.35 287.208L317.631 363.933C337.029 381.182 366.738 379.441 383.988 360.043L234.57 227.173L231.35 287.208ZM232.44 115.276C232.768 109.149 228.067 103.915 221.94 103.586L197.196 102.259C191.068 101.93 185.834 106.632 185.505 112.759L170.674 389.319C170.346 395.447 175.047 400.681 181.174 401.01L205.918 402.337C212.046 402.665 217.28 397.964 217.609 391.836L232.44 115.276Z"
						fill="url(#paint0_linear_12_9)"
					/>
				</g>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M251.32 216.582C242.142 207.404 242.142 192.524 251.32 183.346L337.019 97.6472L353.637 114.265C362.815 123.443 362.815 138.323 353.637 147.5L267.938 233.199L251.32 216.582ZM174.443 173.706L138.096 141.384L121.63 159.901C113.474 169.073 114.297 183.119 123.469 191.275L171.223 233.74L174.443 173.706ZM231.35 287.208L317.631 363.933C337.029 381.182 366.738 379.441 383.988 360.043L234.57 227.173L231.35 287.208ZM232.44 115.276C232.768 109.149 228.067 103.915 221.94 103.586L197.196 102.259C191.068 101.93 185.834 106.632 185.505 112.759L170.674 389.319C170.346 395.447 175.047 400.681 181.174 401.01L205.918 402.337C212.046 402.665 217.28 397.964 217.609 391.836L232.44 115.276Z"
					fill="url(#paint1_linear_12_9)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_i_12_9"
					x="0"
					y="-50"
					width="500"
					height="550"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-50" />
					<feGaussianBlur stdDeviation="50" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.64 0" />
					<feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_9" />
				</filter>
				<linearGradient
					id="paint0_linear_12_9"
					x1="245.425"
					y1="99.6393"
					x2="245.425"
					y2="558.66"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.313079" stop-color="white" />
					<stop offset="1" stop-color="white" stop-opacity="0" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_12_9"
					x1="245.425"
					y1="99.6393"
					x2="245.425"
					y2="558.66"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.313079" stop-color="white" />
					<stop offset="1" stop-color="white" stop-opacity="0" />
				</linearGradient>
				<clipPath id="clip0_12_9">
					<rect width="500" height="500" fill="white" />
				</clipPath>
			</defs>
		</svg>,

		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
