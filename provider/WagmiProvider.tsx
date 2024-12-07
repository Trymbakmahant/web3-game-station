"use client";
// import { WagmiProvider } from "wagmi";

// import React from "react";
// import { config } from "@/config/wagmi";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { http, createConfig } from "wagmi";
// import { baseSepolia } from "wagmi/chains";
// import { coinbaseWallet } from "wagmi/connectors";
// const queryClient = new QueryClient();

// export const CoinBaseconfig = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     coinbaseWallet({ appName: "Create Wagmi", preference: "smartWalletOnly" }),
//   ],
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
// const WagmiProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <WagmiProvider config={config}>
//       {" "}
//       <QueryClientProvider client={queryClient}>
//         {" "}
//         {children}
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// };

// export default WagmiProviders;

import { wagmiAdapter, projectId } from "@/config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// // Set up metadata
const metadata = {
  name: "appkit-example",
  description: "AppKit Example",
  url: "https://appkitexampleapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// // Create the modal
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
