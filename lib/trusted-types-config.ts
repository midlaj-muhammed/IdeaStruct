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

const allowedDomains = [
  'https://oicpljilposaqgiurura.supabase.co',
  'https://accounts.google.com',
  'https://www.google.com',
  'https://play.google.com',
  'https://*.google.com',
  'https://*.googleusercontent.com',
  'https://github.com',
  'https://*.github.com',
  'https://api.github.com',
  'https://*.githubusercontent.com',
  'https://github.githubassets.com',
  'https://unpkg.com',
  'https://api.puter.com',
  'https://*.puter.com',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://*.vercel.app',  // Allow Vercel preview deployments
  process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : '',  // Allow production deployment
]

function isAllowedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Always allow same origin
    if (urlObj.hostname === window.location.hostname) {
      return true;
    }

    // Check against allowed domains
    return allowedDomains.some(domain => {
      if (domain.includes('*')) {
        // Handle wildcard domains
        const pattern = domain.replace(/\./g, '\\.').replace('*', '.*');
        const regex = new RegExp(`^${pattern}`);
        return regex.test(url) || regex.test(urlObj.origin);
      }
      return url.startsWith(domain) || urlObj.origin.startsWith(domain);
    });
  } catch {
    return false;
  }
}

export function configureTrustedTypes() {
  if (typeof window === 'undefined' || !window.trustedTypes?.createPolicy) {
    return;
  }

  try {
    // Default policy for Next.js
    window.trustedTypes.createPolicy('default', {
      createHTML: (input: string) => input,
      createScript: (input: string) => input,
      createScriptURL: (input: string) => {
        if (isAllowedDomain(input)) {
          return input;
        }
        throw new Error(`URL ${input} is not allowed by trusted types policy`);
      },
    }, { force: true });

    // Policy for Next.js bundler
    window.trustedTypes.createPolicy('nextjs#bundler', {
      createHTML: (input: string) => input,
      createScript: (input: string) => input,
    }, { force: true });

    // Policy for webpack bundler
    window.trustedTypes.createPolicy('webpack#bundler', {
      createScript: (input: string) => input,
    }, { force: true });

    // Policy for Google HTML
    window.trustedTypes.createPolicy('goog#html', {
      createHTML: (input: string) => input,
    }, { force: true });

    // Policy for IdeaStruct
    window.trustedTypes.createPolicy('ideastruct-policy', {
      createHTML: (input: string) => input,
      createScript: (input: string) => input,
      createScriptURL: (input: string) => {
        if (isAllowedDomain(input)) {
          return input;
        }
        throw new Error(`URL ${input} is not allowed by trusted types policy`);
      },
    }, { force: true });

  } catch (error) {
    console.error('Error configuring trusted types:', error);
  }
}
