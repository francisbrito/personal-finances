import S from "fluent-schema";

export const PAGINATION_PARAMETERS_SCHEMA = S.object()
  .id("schema:pagination-parameters")
  .title("PaginationSchema")
  .prop(
    "limit",
    S.number()
      .minimum(0)
      .maximum(100)
      .default(30)
  )
  .prop(
    "offset",
    S.number()
      .minimum(0)
      .default(0)
  );

export const PAGINATED_RESPONSE_SCHEMA = S.object()
  .id("schema:paginated-response")
  .title("PaginatedResponseSchema")
  .prop("count", S.number().minimum(0));
