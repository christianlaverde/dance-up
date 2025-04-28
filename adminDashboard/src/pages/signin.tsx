'use client';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router';
import { useSession, type Session } from '../SessionContext';
import { signInWithGoogle, signInWithCredentials, signInWithFacebook } from '../firebase/auth';


export default function SignIn() {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();

  if (loading) {
    return <LinearProgress />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[{ id: 'google', name: 'Google' }, { id: 'facebook', name: 'Facebook'}, { id: 'credentials', name: 'Credentials' }]}
      signIn={async (provider, formData, callbackUrl) => {
        let result;
        try {
          if (provider.id === 'google') {
            result = await signInWithGoogle();
          }
          if (provider.id === 'facebook') {
            result = await signInWithFacebook();
          }
          
          if (provider.id === 'credentials') {
            const email = formData?.get('email') as string;
            const password = formData?.get('password') as string;

            if (!email || !password) {
              return { error: 'Email and password are required' };
            }

            result = await signInWithCredentials(email, password);
          }

          if (result?.success && result?.user) {
            console.log(result)
            const userSession: Session = {
              user: {
                name: result.user.displayName || '',
                email: result.user.email || '',
                image: result.user.photoURL || '',
                phoneNumber: result.user.phoneNumber || '',
                id: result.user.uid || '',
              },
            };
            
            setSession(userSession);
            // Check if the email is already associated with an account
            const response = await fetch('http://localhost:3000/danceStudios?email=' + encodeURIComponent(userSession.user.email));
            const existingAccount = await response.json();

            if (!existingAccount || existingAccount.length === 0) {
              // Post the user data to the danceStudios route
              await fetch('http://localhost:3000/danceStudios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: userSession.user.name,
                  email: userSession.user.email,
                  image: userSession.user.image,
                  phoneNumber: userSession.user.phoneNumber,
                  id: userSession.user.id,
                }),
              });
            }
            // Store the session in local storage
            localStorage.setItem('session', JSON.stringify(userSession));
            // Redirect to the callback URL or home page
            navigate(callbackUrl || '/', { replace: true });
            return {};
          }
          return { error: result?.error || 'Failed to sign in' };
        } catch (error) {
          return { error: error instanceof Error ? error.message : 'An error occurred' };
        }
      }}
        
    />
  );
}