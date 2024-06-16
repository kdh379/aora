interface SignUpProps extends Pick<User, "email" | "username"> {
  password: string;
}

interface SignInProps extends Pick<User, "email"> {
  password: string;
}

interface User {
  email: string;
  username: string;
  accountId: string;
  avatar: string;
}