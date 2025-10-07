import { AlertTriangle } from "lucide-react";
export function Disclaimer() {
  return (
    <div className="bg-yellow-400/20 border-t-2 border-yellow-500 text-yellow-800 dark:text-yellow-300 px-4 py-3" role="alert">
      <div className="flex items-center max-w-7xl mx-auto">
        <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0" />
        <div>
          <p className="font-bold text-sm">Disclaimer</p>
          <p className="text-xs">
            This is a demo application for illustrative purposes only. It is not intended for real trading or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}