import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

export type ISearchParams = {
  restaurantName?: string;
  cuisineCategoryId?: string;
  maxFoodPrice?: number | string;
  datetime?: string;
  numberOfPeople?: number | string;
  location?: string;
  pageNumber?: number | string;
  pageSize?: number | string;
};

export const getHomeSearch = (params?: ISearchParams) => {
  return instance.get(`/home/search`, {
    params,
  });
};

export const useGetHomeSearch = (params?: ISearchParams) => {
  return useQuery(["home-search", params], () => getHomeSearch(params));
};

// Get cuisine-List
export const getCuisineList = async () => {
  const { data, headers } = await instance.get(
    "/additional-info/cuisine-catagories"
  );
  return { data, headers };
};
