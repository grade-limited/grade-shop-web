import instance from "@/service";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, MutationFunction } from "@tanstack/react-query";

interface JobApplyFormData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNo: string;
  address: string;
  educationalStatus: string;
  universityName: string;
  resume: File | null;
  coverLetter: File | null;
  jobId: number;
}

interface JobApplyResponse {
  data?: {
    isValid: boolean;
    data: string;
    message: string;
  };
  status?: number;
}

interface CreateUserResponse {
  // Define the response type here
  // Adjust it according to your API response structure
}
// Apply for job.
// <CreateUserResponse, JobApplyFormData>
const applyForJob = async (payload: any) => {
  return instance.postForm(`/career/apply/${payload.jobId}`, payload);
  // const formData = new FormData();

  // formData.append("Firstname", payload.firstname);
  // formData.append("Lastname", payload.lastname);
  // formData.append("Email", payload.email);
  // formData.append("Phone", payload.phoneNo);
  // formData.append("PresentAddress", payload.address);
  // formData.append("EducationalStatus", payload.educationalStatus);
  // formData.append("UniversityName", payload.universityName);
  // formData.append("CoverLetter", payload.coverLetter);
  // formData.append("CV", payload.resume);

  // if (payload.isAccount === false) {
  //   formData.append("UserName", payload.username);
  //   formData.append("Password", payload.password);
  // }

  // // if (!(data.username === "" || undefined)) {
  // //   console.log(data.username);
  // // }
  // // if (data.password !== "") {
  // // }
  // // console.log(formData.has("Username"), formData.has("Password"));
  // // formData.forEach(function (value, key) {
  // //   // Perform actions with key and value
  // //   console.log(key + ": " + value);
  // // });

  // // return await instance.post(`/career/apply/${data.jobId}`, formData, {
  // //   headers: {
  // //     "Content-Type": "multipart/form-data",
  // //   },
  // // });

  // try {
  //   const { data, status, statusText } = await instance.post(`/career/apply/${payload.jobId}`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
};

export const useApplyForJob = () => {
  return useMutation([], applyForJob, {
    onSuccess: () => {},
  });
};
