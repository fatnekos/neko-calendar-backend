// deno-lint-ignore-file no-explicit-any
export default ({ response }: { response: any }) => {
  response.status = 404;
  response.body = {
    success: false,
    message: "404 - Not found.",
  };
};