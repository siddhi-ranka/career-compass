// Authentication removed: provide a simple no-op stub so the app builds without Firebase.
export function useAuth() {
  // Return a stable shape used by components: no user signed in and not loading.
  return { user: null, loading: false, signIn: async () => {}, signOut: async () => {} };
}
