"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserContext";
import { isInAppBrowser } from "@/lib/in-app-browser-detector";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { applicationUrls } from "@/constants/application-urls";

function GoogleLogo({ ...props }) {
  return (
    <div {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function GoogleSignIn() {
  const { signInWithGoogleHandler, loading, authUser } = useAuth();
  const [isInApp, setIsInApp] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const checkInAppBrowser = () => {
      const inApp = isInAppBrowser();
      setIsInApp(inApp);
      if (inApp) {
        setIsPopoverOpen(true);
      }
    };

    checkInAppBrowser();
  }, []);

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const openInBrowser = () => {
    window.open(applicationUrls.login.root, "_blank");
    handlePopoverClose();
  };

  async function handleSignInWithGoogle() {
    if (isInApp) {
      // If in an in-app browser, open the popover
      setIsPopoverOpen(() => true);
      return;
    }

    try {
      await signInWithGoogleHandler();
    } catch (error) {
      console.log("Error signing in with Google:", error);
      // Handle error appropriately, e.g., show a notification
    }
  }

  function InAppBrowserDialog() {
    return (
      <Dialog open={isPopoverOpen} onOpenChange={handlePopoverClose}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Continue in Browser</DialogTitle>
            <DialogDescription>
              It seems you are using an in-app browser. Press the button below
              to continue in your default browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={openInBrowser} className="w-full">
              <span>Open in Browser</span>
              <ArrowUpRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Button
        type="submit"
        className="w-full"
        variant="outline"
        disabled={loading || authUser}
        onClick={handleSignInWithGoogle}
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <GoogleLogo className="w-4 h-4" />
        )}
        <span>Continue with Google</span>
      </Button>
      {isInApp && <InAppBrowserDialog />}
    </>
  );
}
