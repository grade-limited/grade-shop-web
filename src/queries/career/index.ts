import instance from "@/service";
import { useQuery, useMutation } from "@tanstack/react-query";

interface res {
  data: number;
  count: number;
  status: string;
}

/**
 *  1. Get List of careers.
 *  2. Get a single career informaition.
 *  3. Apply in a career post.
 */

// Get list of career.
export const getCareers = ({ params }: { params?: any }) =>
  instance.get("/career/jobs", {
    params,
  });

export const useGetCareers = ({ initialData, params }: { initialData: any; params?: any }) => {
  return useQuery(["careers", params], () => getCareers({ params }), {
    select: (data) => data?.data || { data: [] },
    placeholderData: initialData,
    initialData: initialData,
    enabled: false,
  });
};

// Get Image preview
export const previewCareerImage = (fileName: string | null) => `${instance.getUri()}/career/job/image/${fileName}`;

// Get single career item

export const getCareer = ({ id, params }: { id: number; params?: any }) => {
  return instance.get(`/career/job/${id}`, {
    params,
  });
};
