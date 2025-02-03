// @ts-nocheck
/**
 * Runs commands after the last config in the chain
 * @param {(false | string)[]} commands - Commands to run after build
 * @returns {(configs: import('tsup').Options[]) => import('tsup').Options[]} Config transformer
 */
export const runAfterLast =
	(commands) =>
	(...configs) => {
		const [last, ...rest] = configs.reverse();
		return [
			...rest.reverse(),
			{
				...last,
				onSuccess: [last?.onSuccess, ...commands].filter(Boolean).join(' && '),
			},
		];
	};
