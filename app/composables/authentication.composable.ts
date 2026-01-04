import type { FetchError } from "ofetch";
import type { ApiError } from "~/types/ApiResponses.type";
import type { Customer } from "~/types/User.type";

export interface LoginParam {
  email: string;
  password: string;
}

export const useAuthentication = () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const login = async (param: LoginParam) => {
    try {
      const res: { user: Customer; token: string } = await $fetch(
        `${config.public.apiBase}/site/login`,
        {
          method: "POST",
          body: param,
        }
      );

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/");
    } catch (error) {
      const fetchError = error as FetchError<any>;

      if (fetchError.statusCode == 401) {
        const apiError: ApiError = {
          message: "Your email or password is incorrect",
          errors: fetchError.data?.errors,
          statusCode: fetchError.status,
        };

        console.error(`Failed to fetch products:`, error);
        throw apiError;
      } else {
        const apiError: ApiError = {
          message:
            fetchError.data?.message ??
            fetchError.message ??
            "Something went wrong",
          errors: fetchError.data?.errors,
          statusCode: fetchError.status,
        };

        console.error(`Failed to fetch products:`, error);
        throw apiError;
      }
    }
  };

  return { login };
};
