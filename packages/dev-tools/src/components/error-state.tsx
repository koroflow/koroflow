import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export function ErrorState({
  namespace
}: {
  namespace: string
}) {
  return (
    <motion.div
      className="space-y-4 rounded-lg text-center shadow-lg text-base "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <Alert variant="destructive" className="max-w-2xl rounded-t-none" >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-lg font-semibold">SDK Initialization Failed</AlertTitle>

      <AlertDescription className="mt-2 -ml-7">
        <p className="mb-2">
          The @koroflow/core SDK could not be found in the global scope. This usually means either:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The namespace has been changed from its default value</li>
          <li>The SDK initialization failed</li>
        </ul>
        {namespace && (
          <p className="mt-3 text-sm">
            Current namespace: <code className="bg-red-100/10 px-1 py-0.5 rounded">{namespace}</code>
          </p>
        )}
        </AlertDescription>
      </Alert>

    </motion.div>
  );
}
