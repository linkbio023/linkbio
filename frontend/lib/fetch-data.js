"use client";
import { ResponseDTO } from "@/DTO/response";
import { getAuthToken } from "@/services/auth-services";

export const fetchMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export async function fetchData(url, method, data) {
  const token = await getAuthToken();
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (response?.status == 401 && response?.message == "auth/id-token-expired") {
    await getAuthToken(true);
    return fetchData(url, method, data);
  }

  const responseData = await response?.json();
  const responseDTO = new ResponseDTO()
    .setSuccess(responseData?.success)
    .setMessage(responseData?.message)
    .setData(responseData?.data)
    .build();

  return responseDTO;
}

// Upload file function used to upload files to the server
// It does not adds the content type to the headers statically
// Browser will automatically set the content type based on the file type
export async function uploadFile(url, method, data) {
  const token = await getAuthToken();
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  const response = await fetch(url, options);

  if (response?.status == 401 && response?.message == "auth/id-token-expired") {
    await getAuthToken(true);
    return uploadFile(url, method, data);
  }

  const responseData = await response?.json();
  const responseDTO = new ResponseDTO()
    .setSuccess(responseData?.success)
    .setMessage(responseData?.message)
    .setData(responseData?.data)
    .build();

  return responseDTO;
}
