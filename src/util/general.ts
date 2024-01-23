function validateSignUpData(
  username: string | undefined,
  email: string | undefined,
  password: string | undefined
): string | null {
  const usernameRegex = /^.{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;
  console.log('username -->', username);

  if (!email && !emailRegex.test(email as string)) {
    return 'Invalid email address.';
  }
  if (!username && !usernameRegex.test(username as string)) {
    return 'Username must be 8-16 characters.';
  }

  if (!password && !passwordRegex.test(password as string)) {
    return 'Password must be at least 8 characters.';
  }

  return null; // Return null if all validations pass
}

function validateSignInData(
  email: string | undefined,
  password: string | undefined
): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  if (email && !emailRegex.test(email)) {
    return 'Invalid email address.';
  }

  if (password && !passwordRegex.test(password)) {
    return 'Password must be at least 8 characters.';
  }

  return null; // Return null if all validations pass
}

export { validateSignUpData, validateSignInData };
