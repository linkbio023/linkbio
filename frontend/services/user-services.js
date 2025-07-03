import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { UserCountDTO, UserDTO, UserListDTO } from "@/DTO/user";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebase";
import { SubscriptionDTO } from "@/DTO/subscription";
import { appMode } from "@/constants/app-mode";

// Create a new user
export function useCreateUser() {
  async function createUser(url, { arg }) {
    return fetchData(url, fetchMethods.POST, arg);
  }

  const url = apiUrls.user.create;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    createUser
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

  const userData = new UserDTO()
    .setId(responseData?.id)
    .setEmail(responseData?.email)
    .setName(responseData?.name)
    .setRole(responseData?.role)
    .setSubscription(responseData?.subscription)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { trigger, reset, userData, error, isMutating };
}

// Update a user
export function useUpdateUser() {
  async function updateUser(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const url = apiUrls.user.update;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updateUser
  );

  if (error) {
    toast.warning(data?.message);
  }

  const userData = new UserDTO()
    .setId(data?.id)
    .setEmail(data?.email)
    .setName(data?.name)
    .setRole(data?.role)
    .setSubscription(data?.subscription)
    .setCreatedAt(data?.createdAt)
    .setUpdatedAt(data?.updatedAt)
    .build();

  return { trigger, reset, userData, error, isMutating };
}

// Delete a user
export function useDeleteUser(id) {
  async function deleteUser(url) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.DELETE);
  }

  const url = `${apiUrls.user.delete}${id}`;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    id ? url : null,
    deleteUser
  );

  if (error) {
    toast.warning(data?.message);
  }

  const userData = new UserDTO()
    .setId(data?.id)
    .setEmail(data?.email)
    .setName(data?.name)
    .setRole(data?.role)
    .setSubscription(data?.subscription)
    .setCreatedAt(data?.createdAt)
    .setUpdatedAt(data?.updatedAt)
    .build();

  return { trigger, reset, userData, error, isMutating };
}

// View a user
export function useViewUser(id) {
  async function viewUser(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.user.view}${id}`;

  const { data, error, isLoading, isValidating } = useSWR(
    id ? url : null,
    viewUser,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
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

  const userData = new UserDTO()
    .setId(responseData?.id)
    .setEmail(responseData?.email)
    .setName(responseData?.name)
    .setRole(responseData?.role)
    .setSubscription(responseData?.subscription)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { userData, error, success, message, isLoading, isValidating };
}
// View a user profile
export function useViewUserProfile() {
  async function viewUser(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.user.profile;

  const { data, error, isLoading, isValidating } = useSWR(url, viewUser, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

  const responseData = data?.data;
  const user = responseData?.user;
  const subscription = responseData?.subscription;
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

  const userData = new UserDTO()
    .setId(user?.id)
    .setEmail(user?.email)
    .setName(user?.name)
    .setCreatedAt(user?.createdAt)
    .setUpdatedAt(user?.updatedAt)
    .build();

  const subscriptionData = new SubscriptionDTO()
    .setId(subscription?.id)
    .setPlan(subscription?.plan)
    .setAmount(subscription?.amount)
    .setCurrency(subscription?.currency)
    .setPaymentPlatform(subscription?.paymentPlatform)
    .setStatus(subscription?.status)
    .setCurrentPeriodStartDate(subscription?.currentPeriodStartDate)
    .setCurrentPeriodEndDate(subscription?.currentPeriodEndDate)
    .setCreatedAt(subscription?.createdAt)
    .setUpdatedAt(subscription?.updatedAt)
    .build();

  return {
    userData,
    subscriptionData,
    error,
    success,
    message,
    isLoading,
    isValidating,
  };
}

// List all users with pagination and parameters query
export function useListUsers(params = "") {
  async function listUsers(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.user.list}${params}`;

  const { data, error, isLoading } = useSWR(url, listUsers, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

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

  const users = new UserListDTO().setUsers(responseData).build();

  return { users, error, isLoading };
}

// Count all users
export function useCountUsers() {
  async function countUsers(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.user.count;

  const { data, error, isLoading, isValidating } = useSWR(url, countUsers, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

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

  const userCount = new UserCountDTO().setCount(responseData?.count).build();

  return { userCount, error, isLoading, isValidating, success, message };
}

// Update only name of the user
export function useUpdateName() {
  async function updateName(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const url = apiUrls.user.updateName;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updateName
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && (error || success == false)) {
      toast.warning(message);
    }

    if (isMounted && success == true) {
      toast.success(message);
    }
    return () => {
      isMounted = false;
    };
  }, [success, message, error]);

  const userData = new UserDTO()
    .setId(responseData?.id)
    .setEmail(responseData?.email)
    .setName(responseData?.name)
    .setRole(responseData?.role)
    .setSubscription(responseData?.subscription)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { trigger, reset, userData, error, success, isMutating };
}

// Update only email of the user
export function useUpdateEmail() {
  async function updateEmail(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const url = apiUrls.user.updateEmail;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updateEmail
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && (error || success == false)) {
      toast.warning(message);
    }

    if (isMounted && success == true) {
      toast.success(message);
    }
    return () => {
      isMounted = false;
    };
  }, [success, message, error]);

  const userData = new UserDTO()
    .setId(responseData?.id)
    .setEmail(responseData?.email)
    .setName(responseData?.name)
    .setRole(responseData?.role)
    .setSubscription(responseData?.subscription)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { trigger, reset, userData, error, success, isMutating };
}

// Update only password of the user
export function useUpdatePassword() {
  async function updatePassword(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const url = apiUrls.user.updatePassword;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updatePassword
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && (error || success == false)) {
      toast.warning(message);
    }

    if (isMounted && success == true) {
      toast.success(message);
    }
    return () => {
      isMounted = false;
    };
  }, [success, message, error]);

  const userData = new UserDTO()
    .setId(responseData?.id)
    .setEmail(responseData?.email)
    .setName(responseData?.name)
    .setRole(responseData?.role)
    .setSubscription(responseData?.subscription)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { trigger, reset, userData, error, success, isMutating };
}

// Get user role and subscription from firebase auth custom claims and return userRole and userSubscription
// Save the values in sessionStorage
// On force refresh, the values are first fetched from sessionStorage, then from firebase auth custom claims
export function useCustomClaims() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const subscription = sessionStorage.getItem("userSubscription");

    setUserSubscription(subscription);
    setUserRole(role);
    setIsLoading(false);

    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const role = tokenResult.claims.role;
          const subscription = tokenResult.claims.subscription;

          setUserRole(role);
          setUserSubscription(subscription);

          sessionStorage.setItem("userRole", role);
          sessionStorage.setItem("userSubscription", subscription);
        } catch (error) {
          console.error("Error fetching custom claims:", error);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { userRole, userSubscription, isLoading };
}
