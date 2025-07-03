"use client";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { toast } from "sonner";
import {
  BiolinkBackgroundDesignDTO,
  BiolinkButtonDesignDTO,
  BiolinkCountDTO,
  BiolinkDesignDTO,
  BiolinkDTO,
  BiolinkListDTO,
  BiolinkUsernameAvailabilityCheckDTO,
  LinkDTO,
} from "@/DTO/biolink";
import { useEffect, useState } from "react";
import { applicationUrls } from "@/constants/application-urls";
import { useRouter, useSearchParams } from "next/navigation";
import revalidateCache from "@/actions/revalidate-cache";
import { UserDTO } from "@/DTO/user";
import { appMode } from "@/constants/app-mode";

// List all biolinks with pagination
export function useListBiolinks(params = "", beneficiary = "user") {
  async function listBiolinks(url) {
    return fetchData(url, fetchMethods.GET);
  }

  // beneficiary user or adminstartor
  const url = `${apiUrls.biolink.list}${params}${
    beneficiary == "administrator"
      ? `&beneficiary=administrator`
      : `&beneficiary=user`
  }`;

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    params ? url : null,
    listBiolinks,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error && !isLoading) {
      console.log(error);
      toast.warning(data?.message);
    }
  }, [data, error, isLoading]);

  const biolinks = new BiolinkListDTO().setBiolinks(data?.data).build();

  return { biolinks, isLoading, error, mutate, isValidating };
}

// Check username availability
export function useCheckUsername(username) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkUsername(url) {
      setIsLoading(true);
      try {
        const response = await fetchData(url, fetchMethods.GET);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (username) {
      const url = `${apiUrls.biolink.check}?username=${username}`;
      checkUsername(url);
    }
  }, [username]);

  useEffect(() => {
    if (error && !isLoading) {
      console.log(error);
      toast.warning(data.message);
    }
  }, [data, error, isLoading]);

  const usernameAvailability = new BiolinkUsernameAvailabilityCheckDTO()
    .setIsAvailable(data?.data?.isAvailable)
    .build();

  return { usernameAvailability, isLoading };
}

// Create a new biolink
export function useCreateBiolink() {
  const router = useRouter();
  const { mutate } = useListBiolinks();
  async function createBiolink(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.POST, arg);
  }

  const url = apiUrls.biolink.create;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    createBiolink
  );

  useEffect(() => {
    if (error && !isMutating) {
      console.log(error);
      toast.warning(data?.message);
    }

    if (data) {
      if (data.success == true) {
        mutate();

        router.push(
          `${applicationUrls.dashboard.biolink.view}${data?.data?.biolink[0]?._id}`
        );
      }
    }
  }, [data, error, , mutate, isMutating, router]);

  return { trigger, reset, data, error, isMutating };
}

// Update a biolink
export function useUpdateBiolink() {
  async function updateBiolink(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.PUT, arg);
  }

  const url = apiUrls.biolink.update;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    url,
    updateBiolink
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    // Show success message & revalidate cache
    if (success == true && isMounted) {
      toast.success(message);

      // Revalidate cache
      const biolonkUrl = `/${responseData?.biolink?.username}`;
      if (biolonkUrl) {
        revalidateCache(biolonkUrl);
      }
    }

    // Show error message
    if (success == false && isMounted) {
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [responseData, success, message, error, isMutating]);

  return { trigger, reset, data, error, isMutating };
}

// Delete a biolink
export function useDeleteBiolink(id) {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;

  const { mutate } = useListBiolinks(params, "user");

  async function deleteBiolink(url) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.DELETE);
  }

  const url = `${apiUrls.biolink.delete}${id}`;

  const { trigger, reset, data, error, isMutating } = useSWRMutation(
    id ? url : null,
    deleteBiolink
  );

  const responseData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    // Show error message
    if ((success == false || error) && isMounted) {
      toast.warning(message);
    }
    // Show if successful
    if (success == true && isMounted) {
      toast.success(message);
      mutate();
    }

    return () => {
      isMounted = false;
    };
  }, [error, success, message, mutate]);

  return { trigger, reset, responseData, success, message, error, isMutating };
}

// View a biolink
export function useViewBiolink(id) {
  async function viewBiolink(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.biolink.view}${id}`;

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    url,
    viewBiolink,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }
  );

  const responseData = data?.data;
  const message = data?.message;
  const success = data?.success;

  useEffect(() => {
    let isMounted = true;

    // Show error message
    if ((error || success == false) && isMounted) {
      console.log(error);
      toast.warning(message);
    }

    return () => {
      isMounted = false;
    };
  }, [error, success, message]);

  const bioLinkData = responseData?.biolink;
  const biolinkDesignData = responseData?.biolinkDesign;

  const links = bioLinkData?.links?.map((link) => {
    return new LinkDTO()
      .setId(link?.id)
      .setBiolink(link?.biolink)
      .setDesign(link?.design)
      .setLayout(link?.layout)
      .setTitle(link?.title)
      .setDescription(link?.description)
      .setUrl(link?.url)
      .setImage(link?.image)
      .setSchedule(link?.schedule)
      .setProtected(link?.protected)
      .build();
  });

  const biolink = new BiolinkDTO()
    .setId(bioLinkData?.id)
    .setUser(bioLinkData?.user)
    .setUsername(bioLinkData?.username)
    .setName(bioLinkData?.name)
    .setArName(bioLinkData?.ar_name)
    .setArBio(bioLinkData?.ar_bio)
    .setProfilePicture(bioLinkData?.profilePicture)
    .setBio(bioLinkData?.bio)
    .setSocialMediaLinks(bioLinkData?.socialMediaLinks)
    .setLinks(links)
    .setCreatedAt(bioLinkData?.createdAt)
    .setUpdatedAt(bioLinkData?.updatedAt)
    .build();

  const buttonDesign = biolinkDesignData?.buttonDesign;
  const biolinkButtonDesignDTO = new BiolinkButtonDesignDTO()
    .setType(buttonDesign?.type)
    .setHeight(buttonDesign?.height)
    .setBackgroundColor(buttonDesign?.backgroundColor)
    .setBorderWidth(buttonDesign?.borderWidth)
    .setBorderRadius(buttonDesign?.borderRadius)
    .setBorderColor(buttonDesign?.borderColor)
    .setTextColor(buttonDesign?.textColor)
    .setShadow(buttonDesign?.shadow)
    .setExtra(buttonDesign?.extra)
    .build();
  const backgroundDesign = biolinkDesignData?.backgroundDesign;
  const biolinkBackgroundDesignDTO = new BiolinkBackgroundDesignDTO()
    .setBackgroundType(backgroundDesign?.backgroundType)
    .setBackgroundImage(backgroundDesign?.backgroundImage)
    .setBackgroundColor(backgroundDesign?.backgroundColor)
    .setBackgroundGradient(backgroundDesign?.backgroundGradient)
    .setThemeTextColor(backgroundDesign?.themeTextColor)
    .build();

  const biolinkDesign = new BiolinkDesignDTO()
    .setButtonDesign(biolinkButtonDesignDTO)
    .setBackgroundDesign(biolinkBackgroundDesignDTO)
    .setDimensionUnit(biolinkDesignData?.dimensionUnit)
    .build();

  return {
    biolink,
    biolinkDesign,
    isLoading,
    error,
    mutate,
    isValidating,
    success,
    message,
  };
}
// Administrators View of a biolink
export function useAdministratorsViewBiolink(id) {
  async function viewBiolink(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.biolink.administratorsView}${id}`;

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    id ? url : null,
    viewBiolink,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }
  );

  const bioLinkData = data?.data;
  const success = data?.success;
  const message = data?.message;

  useEffect(() => {
    let isMounted = true;
    if (error && success == false && isMounted) {
      toast.warning(message);
    }
    return () => {
      isMounted = false;
    };
  }, [error, success, message]);

  const user = bioLinkData?.user;
  const userDTO = new UserDTO()
    .setId(user?.id)
    .setName(user?.name)
    .setEmail(user?.email)
    .setCreatedAt(user?.createdAt)
    .setUpdatedAt(user?.updatedAt)
    .build();

  const biolink = new BiolinkDTO()
    .setId(bioLinkData?.id)
    .setUser(userDTO)
    .setUsername(bioLinkData?.username)
    .setName(bioLinkData?.name)
    .setArName(bioLinkData?.ar_name)
    .setArBio(bioLinkData?.ar_bio)
    .setBio(bioLinkData?.bio)
    .setCreatedAt(bioLinkData?.createdAt)
    .setUpdatedAt(bioLinkData?.updatedAt)
    .build();

  return { biolink, isLoading, error, mutate, isValidating, success, message };
}

// Count all biolinks
export function useCountBiolinks() {
  async function countBiolinks(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.biolink.count;

  const { data, error, isLoading } = useSWR(url, countBiolinks, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (error && !isLoading) {
      console.log(error);
      toast.warning(data?.message);
    }
  }, [data, error, isLoading]);

  const biolinkCount = new BiolinkCountDTO()
    .setCount(data?.data?.count)
    .build();

  return { biolinkCount, isLoading, error };
}

// Count all biolinks by user
export function useCountBiolinksByUser() {
  async function countBiolinksByUser(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.biolink.countByUser;

  const { data, error, isLoading } = useSWR(url, countBiolinksByUser, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (error && !isLoading) {
      console.log(error);
      toast.warning(data?.message);
    }
  }, [data, error, isLoading]);

  const biolinkCount = new BiolinkCountDTO()
    .setCount(data?.data?.count)
    .build();

  return { biolinkCount, isLoading, error };
}
