import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ErrorState({
	namespace,
}: {
	namespace: string;
}) {
	return (
		<motion.div
			className="space-y-4 rounded-lg text-center text-base shadow-lg "
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Alert variant="destructive" className="max-w-2xl rounded-t-none">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle className="font-semibold text-lg">
					SDK Initialization Failed
				</AlertTitle>

				<AlertDescription className="-ml-7 mt-2">
					<p className="mb-2">
						The @koroflow/core SDK could not be found in the global scope. This
						usually means either:
					</p>
					<ul className="list-disc space-y-1 pl-6">
						<li>The namespace has been changed from its default value</li>
						<li>The SDK initialization failed</li>
					</ul>
					{namespace && (
						<p className="mt-3 text-sm">
							Current namespace:{" "}
							<code className="rounded bg-red-100/10 px-1 py-0.5">
								{namespace}
							</code>
						</p>
					)}
				</AlertDescription>
			</Alert>
		</motion.div>
	);
}
