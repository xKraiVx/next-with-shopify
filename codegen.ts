import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_SHOPIFY_SCHEMA as string]: {
        headers: {
          "X-Shopify-Storefront-Access-Token": process.env
            .NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN as string,
        },
      },
    },
  ],
  documents: "./src/**/*.graphql",
  generates: {
    "src/graphql/graphql-generated-types/types.ts": {
      plugins: ["typescript"],
    },
    "src/graphql/graphql-generated-types": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.ts",
        baseTypesGlobal: "Types",
        dedupeOperationSuffix: true,
      },
      plugins: ["typescript-operations", "typescript-react-query"],
      config: {
        fetcher: {
          func: "@/graphql/fetcher#fetcher",
          isReactHook: true,
        },
        reactQueryVersion: 5,
      },
    },
  },
};
export default config;
