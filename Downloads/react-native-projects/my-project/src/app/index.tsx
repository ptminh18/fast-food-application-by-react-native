import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Button from '../components/button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator/>
  }

  if (!session) {
    return <Redirect href={'/(auth)/sign-in'}/>
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)/menu'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
      <Link href={'/(auth)/sign-up'} asChild>
        <Button text="Sign up" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out"/>
    </View>
  );
};

export default index;