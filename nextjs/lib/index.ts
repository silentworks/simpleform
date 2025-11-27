import type { ZodError } from "zod";

// place files you want to import through the `$lib` alias in this folder.
export const formatError = (errors: ZodError) => {
  const formattedErrors: Record<string, string> = {};
  errors.issues.forEach((err) => {
    const k = err.path.pop() as string;
    if (formattedErrors[k] == null) {
      formattedErrors[k] = err.message;
    }
  });
  return formattedErrors;
};

type Results<T> = ({
  success: true;
  message: string;
  data: T | undefined;
} | {
  success: false;
  message: string;
  errors?: T;
});

export const initialFormState = <T>(): Results<T> => ({
  success: false,
  message: ''
});


