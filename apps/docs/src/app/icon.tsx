import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
	return new ImageResponse(
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			width="32"
			height="32"
			viewBox="0 0 351 351"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M175.17 134.675C165.993 125.497 165.993 110.617 175.17 101.44L276.607 0.00253296L298.337 21.7323C307.515 30.91 307.515 45.79 298.337 54.9677L196.9 156.405L175.17 134.675ZM89.0244 87.7599L47.0868 50.4669L25.8162 74.3867C17.6606 83.558 18.484 97.6043 27.6554 105.76L85.3097 157.029L89.0244 87.7599ZM154.685 218.721L254.237 307.247C276.618 327.15 310.897 325.14 330.8 302.758L158.4 149.452L154.685 218.721ZM156.034 17.9687C156.362 11.841 151.661 6.60717 145.534 6.27856L113.57 4.56445C107.442 4.23584 102.209 8.93692 101.88 15.0646L84.5845 337.577C84.2559 343.705 88.957 348.939 95.0847 349.267L127.048 350.981C133.176 351.31 138.41 346.609 138.738 340.481L156.034 17.9687Z"
				fill="url(#paint0_linear_2140_567)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2140_567"
					x1="170.197"
					y1="2.30168"
					x2="170.197"
					y2="532.061"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.313079" stop-color="#47C2FF" />
					<stop offset="1" stop-color="#47C2FF" stop-opacity="0" />
				</linearGradient>
			</defs>
		</svg>,

		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		}
	);
}
