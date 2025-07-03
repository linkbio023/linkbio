import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import {
  AdministratorCountDTO,
  AdministratorDTO,
  AdministratorListDTO,
} from "@/DTO/administrator";
import { appMode } from "@/constants/app-mode";

// List of all administrator
export function useAdministratorList(params = "") {
  async function getAdministratorList(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.administrator.list}${params}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    getAdministratorList,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error) {
      toast.warning(data?.message);
    }
  }, [error, data]);

  const administrators = data?.data?.administratorList;

  const administratorListData = useMemo(() => {
    if (!administrators) return [];

    return administrators.map((administrator) =>
      new AdministratorDTO()
        .setId(administrator?.id)
        .setName(administrator?.name)
        .setEmail(administrator?.email)
        .setRole(administrator?.role)
        .setCreatedAt(administrator?.createdAt)
        .setUpdatedAt(administrator?.updatedAt)
        .build()
    );
  }, [administrators]);

  const administratorList = new AdministratorListDTO()
    .setAdministratorList(administratorListData)
    .build();

  return { administratorList, error, isLoading, isValidating, mutate };
}

// Count all administrators
export function useAdministratorCount() {
  const url = apiUrls.administrator.count;

  async function countAdministrator(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const { data, error, isLoading, mutate } = useSWR(url, countAdministrator, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (error) {
      toast.warning(data?.message);
    }
  }, [data, error]);

  const administratorCount = new AdministratorCountDTO()
    .setCount(data?.data?.count)
    .build();

  return { administratorCount, error, isLoading, mutate };
}

// View an administrator
export function useViewAdministrator(id) {
  async function viewAdministrator(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.administrator.view}${id}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    id ? url : null,
    viewAdministrator,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    let isMounted = true;

    if ((error || data?.success == false) && isMounted) {
      toast.warning(data?.message);
    }

    return () => {
      isMounted = false;
    };
  }, [data, error]);

  const administratorData = data?.data;

  const administrator = new AdministratorDTO()
    .setId(administratorData?.id)
    .setName(administratorData?.name)
    .setEmail(administratorData?.email)
    .setRole(administratorData?.role)
    .setCreatedAt(administratorData?.createdAt)
    .setUpdatedAt(administratorData?.updatedAt)
    .build();

  return { administrator, error, isLoading, isValidating, mutate };
}

// Update administrator
export function useUpdateAdministrator() {
  async function updateAdministrator(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.POST, arg);
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    apiUrls.administrator.update,
    updateAdministrator
  );

  useEffect(() => {
    if (error || data?.success == false) {
      toast.error(data?.message);
    }

    if (data?.success == true) {
      toast.success(data?.message);
    }
  }, [data, error]);

  return { trigger, isMutating };
}

// Check administrator
export function useCheckAdministrator(email) {
  async function checkAdministrator(url) {
    return fetchData(url, fetchMethods.GET);
  }

  // Add email to the URL as a query parameter
  const url = `${apiUrls.administrator.check}?email=${email}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    email ? url : null,
    checkAdministrator,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    let isMounted = true;

    if (error && !data?.success && isMounted) {
      toast.warning(data?.message);
    }

    return () => {
      isMounted = false;
    };
  }, [error, data]);

  const administratorData = data?.data;
  const administrator = new AdministratorDTO()
    .setId(administratorData?.id)
    .setName(administratorData?.name)
    .setEmail(administratorData?.email)
    .setRole(administratorData?.role)
    .setCreatedAt(administratorData?.createdAt)
    .setUpdatedAt(administratorData?.updatedAt)
    .build();

  return { administrator, data, isLoading, isValidating, mutate };
}
