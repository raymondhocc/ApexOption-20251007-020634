import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { usePortfolioActions } from "@/store/portfolio-store";
export function SettingsPage() {
  const { resetPortfolio } = usePortfolioActions();
  const [isResetting, setIsResetting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved (mock)!", {
      description: "In a real application, your API keys would be securely stored.",
    });
  };
  const handleReset = async () => {
    setIsResetting(true);
    await resetPortfolio();
    setIsResetting(false);
  };
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
          <CardDescription>
            Manage your mock Interactive Brokers API credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="Enter your API key" defaultValue="mock_api_key_12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <Input id="api-secret" type="password" placeholder="Enter your API secret" defaultValue="mock_api_secret_67890" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Credentials
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-500">Danger Zone</CardTitle>
          <CardDescription>
            These actions are irreversible. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="font-medium">Reset Portfolio</p>
            <p className="text-sm text-muted-foreground">This will reset all your positions and portfolio data to the initial mock state.</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reset Portfolio</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently reset your portfolio to the default mock data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset} disabled={isResetting}>
                  {isResetting ? "Resetting..." : "Yes, reset portfolio"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}