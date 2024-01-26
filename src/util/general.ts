function validateSignUpData(
  username: string | undefined,
  email: string | undefined,
  password: string | undefined
): string | boolean {
  const usernameRegex = /^.{8,16}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^.{8,}$/;

  if (!email || !emailRegex.test(email as string)) {
    return 'Invalid email address.';
  }
  if (!username || !usernameRegex.test(username as string)) {
    return 'Username must be 8-16 characters.';
  }

  if (!password || !passwordRegex.test(password as string)) {
    return 'Password must be at least 8 characters.';
  }

  return true;
}

function validateSignInData(
  email: string | undefined,
  password: string | undefined
): string | boolean {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^.{8,}$/;

  if (!email || !emailRegex.test(email)) {
    return 'Invalid email address.';
  }

  if (!password || !passwordRegex.test(password)) {
    return 'Password must be at least 8 characters.';
  }

  return true;
}

export { validateSignUpData, validateSignInData };
