import {
    AuthResponse,
    SignInPage,
    type AuthProvider,
  } from '@toolpad/core/SignInPage';

  const providers =[
    { id: 'google', name: 'Google' },
  ]

  const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
    provider,
  ) => {
    // preview-start
    const promise = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        resolve({ error: 'This is a fake error' });
      }, 500);
    });
    // preview-end
    return promise;
  };

export default function SignIn() {
    return (
        <SignInPage signIn={signIn} providers={providers} />
    )
}