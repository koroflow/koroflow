export const tsconfig = JSON.stringify(
	{
		compilerOptions: {
			jsx: 'react-jsx',
			esModuleInterop: true,
			baseUrl: '.',
			paths: {
				'@/*': ['./*'],
			},
		},
	},
	null,
	2
);
