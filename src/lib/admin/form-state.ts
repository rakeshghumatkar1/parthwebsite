export type SetupFormState = {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  };
  values?: {
    name?: string;
    email?: string;
  };
};

export type LoginFormState = {
  errors?: {
    email?: string;
    password?: string;
    form?: string;
  };
  values?: {
    email?: string;
  };
};
