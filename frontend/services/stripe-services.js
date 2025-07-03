import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { applicationUrls } from "@/constants/application-urls";
import { appMode } from "@/constants/app-mode";

// Create Stripe subscription session
export function useCreateStripeSubscriptionSession() {
  const router = useRouter();
  const url = apiUrls.subscription.stripe.createSubscriptionSession;

  async function createSubscriptionSession(url, { arg }) {
    // If user is not authenticated, send him to login page
    const user = firebaseAuth?.currentUser;
    if (!user) {
      return router.push(applicationUrls.login.root);
    }

    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }

    return fetchData(url, fetchMethods.POST, arg);
  }

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    createSubscriptionSession,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidate: false,
    }
  );
  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;

    if (isMounted && (error || success == false)) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [success, message, error]);

  useEffect(() => {
    if (success == true) {
      router.push(responseData?.url);
    }
  }, [responseData, success, router]);

  return {
    trigger,
    responseData,
    error,
    success,
    message,
    isMutating,
    reset,
  };
}

// Stripe fulfillment webhook
export function useStripeFulfillmentWebhook(sessionId) {
  const url = apiUrls.subscription.stripe.webhook;

  async function stripeFulfillment(url) {
    return fetchData(url, fetchMethods.POST, { sessionId });
  }

  const { data, error, isLoading, isValidating } = useSWR(
    sessionId ? url : null,
    stripeFulfillment,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidate: false,
    }
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;

    if (isMounted && (error || success == false)) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [success, message, error]);

  return {
    responseData,
    error,
    success,
    message,
    isLoading,
    isValidating,
  };
}
