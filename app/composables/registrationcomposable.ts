import type { FetchError } from "ofetch";
import type { ApiError } from "~/types/ApiResponses.type";
import type { Customer } from "~/types/User.type";

export interface RegistrationParam {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const useRegistration = () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const register = async (param: RegistrationParam) => {
    try {
      const res: { user: Customer; token: string } = await $fetch(
        `${config.public.apiBase}/site/register`,
        {
          method: "POST",
          body: param,
        }
      );
    } catch (error) {
      const fetchError = error as FetchError<any>;

      const apiError: ApiError = {
        message:
          fetchError.data?.message ??
          fetchError.message ??
          "Something went wrong",
        errors: fetchError.data?.errors,
        statusCode: fetchError.status,
      };

      console.error(`Registration Failed:`, error);
      throw apiError;
    }
  };

  return { register };
};
