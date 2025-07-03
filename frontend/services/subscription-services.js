import useSWR from "swr";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserDTO } from "@/DTO/user";
import {
  SubscriptionCountDTO,
  SubscriptionDTO,
  SubscriptionListDTO,
} from "@/DTO/subscription";

// Count all subscriptions
export function useCountSubscriptions() {
  const url = apiUrls.subscription.count;

  async function countSubscriptions(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    countSubscriptions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [error, message, success]);

  const subscriptionCount = new SubscriptionCountDTO()
    .setCount(responseData?.count)
    .build();

  return {
    subscriptionCount,
    error,
    isLoading,
    isValidating,
    mutate,
    success,
    message,
  };
}

// List all subscriptions
export function useListSubscriptions(params = "") {
  const url = `${apiUrls.subscription.list}${params}`;

  async function listSubscriptions(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    listSubscriptions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [error, message, success]);

  const subscriptionListData = responseData?.subscriptionList.map(
    (subscription) => {
      const user = subscription?.user;
      const userDTO = new UserDTO().setId(user?.id).setName(user?.name).build();

      return new SubscriptionDTO()
        .setId(subscription?.id)
        .setUser(userDTO)
        .setPlan(subscription?.plan)
        .build();
    }
  );

  const subscriptionList = new SubscriptionListDTO()
    .setSubscriptionList(subscriptionListData)
    .build();

  return {
    subscriptionList,
    error,
    isLoading,
    isValidating,
    mutate,
    success,
    message,
  };
}

// View a subscription
export function useViewSubscription(id) {
  const url = `${apiUrls.subscription.view}${id}`;

  async function viewSubscription(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    viewSubscription,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [error, message, success]);

  const user = responseData?.user;
  const userDTO = new UserDTO()
    .setId(user?.id)
    .setName(user?.name)
    .setEmail(user?.email)
    .build();

  const subscriptionData = new SubscriptionDTO()
    .setId(responseData?.id)
    .setUser(userDTO)
    .setPlan(responseData?.plan)
    .setAmount(responseData?.amount)
    .setCurrency(responseData?.currency)
    .setPaymentPlatform(responseData?.paymentPlatform)
    .setStatus(responseData?.status)
    .setTransactionId(responseData?.transactionId)
    .setPaymentId(responseData?.paymentId)
    .setCurrentPeriodStartDate(responseData?.currentPeriodStartDate)
    .setCurrentPeriodEndDate(responseData?.currentPeriodEndDate)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return {
    subscriptionData,
    error,
    isLoading,
    isValidating,
    mutate,
    success,
    message,
  };
}
