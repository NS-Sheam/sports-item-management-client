import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/sales`,
          method: "GET",
          params,
        };
      },
      providesTags: ["sales", "product"],
    }),
    addSales: builder.mutation({
      query: (newSales) => {
        return {
          url: "/sales",
          method: "POST",
          body: newSales,
        };
      },
      invalidatesTags: ["sales", "product"],
    }),
  }),
});

export const { useAddSalesMutation, useGetSalesQuery } = salesApi;
