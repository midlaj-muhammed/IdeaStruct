declare global {
  interface Window {
    trustedTypes: {
      createPolicy: (
        name: string,
        rules: {
          createHTML?: (input: string) => string;
          createScript?: (input: string) => string;
          createScriptURL?: (input: string) => string;
        },
        options?: { force?: boolean }
      ) => any;
      defaultPolicy: any;
    };
  }
}

// Create a default Trusted Types policy
export function createTrustedTypesPolicy() {
  if (typeof window !== 'undefined' && window.trustedTypes) {
    try {
      // Create default policy
      window.trustedTypes.createPolicy('default', {
        createHTML: (string) => string, // More permissive for React
        createScript: (string) => string,
        createScriptURL: (url) => {
          const allowedDomains = [
            'https://oicpljilposaqgiurura.supabase.co',
            window.location.origin,
            'https://accounts.google.com',
            'https://github.com',
          ];
          
          try {
            const urlObj = new URL(url);
            if (allowedDomains.some(domain => urlObj.href.startsWith(domain))) {
              return url;
            }
            console.warn('Blocked URL:', url);
            if (process.env.NODE_ENV === 'development') {
              return url; // Allow in development, but log warnings
            }
          } catch {
            // Invalid URL
            console.warn('Invalid URL:', url);
          }
          
          throw new Error(`URL ${url} is not allowed by Trusted Types policy`);
        },
      });

      // Create React-specific policy
      window.trustedTypes.createPolicy('react', {
        createHTML: (string) => string, // Allow React's HTML operations
      }, { force: true }); // Force creation even if policy exists
    } catch (error) {
      // Policy might already exist
      console.warn('Trusted Types policy creation error:', error);
    }
  }
}
