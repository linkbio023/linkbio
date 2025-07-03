import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods, uploadFile } from "@/lib/fetch-data";
import { MediaCountDTO, MediaDTO, MediaListDTO } from "@/DTO/media";
import { useEffect } from "react";
import { toast } from "sonner";
import { appMode } from "@/constants/app-mode";

// List all media
export function useListMedia() {
  async function listMedia(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.media.list;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    listMedia,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.warning(data?.message);
    }
  }, [error, data]);

  const mediaListData = data?.data?.mediaList?.map((media) => {
    return new MediaDTO()
      .setId(media?.id)
      .setAlt(media?.alt)
      .setTitle(media?.title)
      .setUrl(media?.url)
      .setPublicId(media?.publicId)
      .setCreatedAt(media?.createdAt)
      .setUpdatedAt(media?.updatedAt)
      .build();
  });

  const mediaListDTO = new MediaListDTO().setMediaList(mediaListData).build();
  const mediaList = mediaListDTO.mediaList;

  return { mediaList, error, isLoading, isValidating, mutate };
}

// Create a new media
export function useCreateMedia() {
  const { mutate } = useListMedia();
  async function createMedia(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return uploadFile(url, fetchMethods.POST, arg);
  }

  const url = apiUrls.media.create;

  const { trigger, data, error, isMutating } = useSWRMutation(url, createMedia);

  useEffect(() => {
    if (error && !isMutating) {
      console.log(error);
      toast.warning(data?.message);
    }

    if (data && !isMutating) {
      toast.success(data.message);
      mutate();
    }
  }, [error, isMutating, data, mutate]);

  return { trigger, data, error, isMutating };
}

// Delete a media
export function useDeleteMedia() {
  const { mutate } = useListMedia();
  async function deleteMedia(url, { arg }) {
    if (appMode === "demo") {
      toast.error("This action is not allowed in demo mode.");
      return;
    }
    return fetchData(url, fetchMethods.DELETE, arg);
  }

  const url = apiUrls.media.delete;

  const { trigger, data, error, isMutating } = useSWRMutation(url, deleteMedia);

  useEffect(() => {
    if (error && !isMutating) {
      console.log(error);
      toast.warning(data?.message);
    }

    if (data && !isMutating) {
      toast.success(data.message);
      mutate();
    }
  }, [error, isMutating, data, mutate]);

  return { trigger, data, error, isMutating };
}

// Count all media
export function useCountMedia() {
  async function countMedia(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = apiUrls.media.count;

  const { data, error, isLoading, isValidating } = useSWR(url, countMedia);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.warning(data?.message);
    }
  }, [error, data]);

  const mediaCount = new MediaCountDTO().setCount(data?.data?.count).build();

  return { mediaCount, error, isLoading, isValidating };
}
