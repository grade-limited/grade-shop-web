import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

//get All Blogs
export const getBlogs = ({ params }: { params?: any }) =>
  instance.get("blog/posts", {
    params,
  });

export const useGetBlogs = ({
  initialData,
  params,
}: {
  initialData: any;
  params?: any;
}) =>
  useQuery(
    ["blogs", params],
    () =>
      getBlogs({
        params,
      }),
    {
      select: (data) => data?.data?.data || { data: [] },
      placeholderData: initialData,
      initialData: initialData,
      enabled: false,
    }
  );

//Get Blog Details By Id

export const getBlogById = ({ params, id }: { params?: any; id: number }) =>
  instance.get(`blog/post/${id}`, {
    params,
  });

export const useGetBlogById = ({
  initialData,
  params,
  id,
}: {
  initialData: any;
  params?: any;
  id: number;
}) =>
  useQuery(
    ["blogById", params, id],
    () =>
      getBlogById({
        params,
        id,
      }),
    {
      select: (data) => data?.data,
      placeholderData: initialData,
      initialData: initialData,
      enabled: false,
    }
  );

export const previewBlogImage = (fileName: string) =>
  `${instance.getUri()}/blog/post/image/${fileName}`;
