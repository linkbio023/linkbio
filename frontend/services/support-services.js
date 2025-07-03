import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { SupportCountDTO, SupportDTO, SupportListDTO } from "@/DTO/support";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserDTO } from "@/DTO/user";
import { useRouter } from "next/navigation";
import { applicationUrls } from "@/constants/application-urls";
import { appMode } from "@/constants/app-mode";

// List all support tickets
export function useListSupport(params = "") {
  const url = `${apiUrls.support.list}${params}`;

  async function listSupport(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    listSupport,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const responseData = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [message, success, error]);

  const supportListData = responseData?.supportList.map((support) => {
    return new SupportDTO()
      .setId(support.id)
      .setUser(support.user)
      .setTitle(support.title)
      .setDetails(support.details)
      .setStatus(support.status)
      .setCreatedAt(support.createdAt)
      .setUpdatedAt(support.updatedAt)
      .build();
  });

  const supportList = new SupportListDTO()
    .setSupportList(supportListData)
    .build();

  return {
    supportList,
    error,
    isLoading,
    isValidating,
    mutate,
    message,
    success,
  };
}

// Count all support tickets
export function useCountSupport() {
  const url = apiUrls.support.count;

  async function countSupport(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, mutate } = useSWR(url, countSupport, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const responseData = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [message, success, error]);

  const supportCount = new SupportCountDTO()
    .setCount(responseData?.count)
    .build();

  return { supportCount, error, isLoading, mutate, success, message };
}

// Create a new support ticket
export function useCreateSupport() {
  const router = useRouter();

  const { mutate: mutateSupportList } = useListSupport();
  const { mutate: mutateSupportCount } = useCountSupport();

  const url = apiUrls.support.create;

  async function createSupport(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.POST, arg);
  }

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    createSupport
  );

  const responseData = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    if (success == true && isMounted) {
      mutateSupportList();
      mutateSupportCount();
      toast.success(message);
      router.push(
        `${applicationUrls.dashboard.support.view}${responseData?.id}`
      );
    }

    return () => {
      isMounted = false;
    };
  }, [
    message,
    success,
    error,
    responseData,
    mutateSupportList,
    mutateSupportCount,
    router,
  ]);

  const supportData = new SupportDTO()
    .setId(data?.id)
    .setUser(data?.user)
    .setTitle(data?.title)
    .setDetails(data?.details)
    .setStatus(data?.status)
    .setCreatedAt(data?.createdAt)
    .setUpdatedAt(data?.updatedAt)
    .build();

  return { trigger, reset, supportData, error, isMutating, message, success };
}

// View a support ticket
export function useViewSupport(id) {
  const url = `${apiUrls.support.view}${id}`;

  async function viewSupport(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    id ? url : null,
    viewSupport,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const support = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;
    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [message, success, error]);

  const userData = support?.user;
  const user = new UserDTO()
    .setId(userData?.id)
    .setEmail(userData?.email)
    .setName(userData?.name)
    .setRole(userData?.role)
    .setSubscription(userData?.subscription)
    .setCreatedAt(userData?.createdAt)
    .setUpdatedAt(userData?.updatedAt)
    .build();

  const supportData = new SupportDTO()
    .setId(support?.id)
    .setUser(user)
    .setTitle(support?.title)
    .setDetails(support?.details)
    .setStatus(support?.status)
    .setCreatedAt(support?.createdAt)
    .setUpdatedAt(support?.updatedAt)
    .build();

  return {
    supportData,
    error,
    isLoading,
    isValidating,
    mutate,
    message,
    success,
  };
}

// Update a support ticket
export function useUpdateSupport(id) {
  const { mutate: mutateSupportView } = useViewSupport(id);
  const url = `${apiUrls.support.update}${id}`;

  async function updateSupport(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updateSupport
  );

  const responseData = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;

    if ((error || success == false) && isMounted) {
      toast.warning(message);
    }

    if (success == true && isMounted) {
      toast.success(message);
      mutateSupportView();
    }

    return () => {
      isMounted = false;
    };
  }, [message, success, error, mutateSupportView]);

  const supportData = new SupportDTO()
    .setId(responseData?.id)
    .setUser(responseData?.user)
    .setTitle(responseData?.title)
    .setDetails(responseData?.details)
    .setStatus(responseData?.status)
    .setCreatedAt(responseData?.createdAt)
    .setUpdatedAt(responseData?.updatedAt)
    .build();

  return { trigger, reset, supportData, error, isMutating, message, success };
}
