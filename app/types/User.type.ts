export type User = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
};

export type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  user_id: string;
  user: User;
  birthday: string;
  gender: string;
};
