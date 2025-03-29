import {
    AuthResponse,
    SignInPage,
    type AuthProvider,
  } from '@toolpad/core/SignInPage';

  const providers = [{ id: 'credentials', name: 'Email and Password' }];

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData,
  ) => {
    const promise = (async (resolve: (arg0: AuthResponse) => void) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = (await response.json()) as AuthResponse;
        resolve(data);
      } else {
        resolve({ error: 'Invalid credentials' });
      }
    });
    return promise;
  };

export default function SignIn() {
    return (
        <SignInPage 
          signIn={signIn} 
          providers={providers} 
          slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}/>
    )
}