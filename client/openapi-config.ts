import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './schemas/openapi.json',
  apiFile: './src/store/api.ts',
  apiImport: 'api',
  outputFiles: {
    './src/store/authApi.ts': {
      filterEndpoints: [/auth/i],
      exportName: 'authApi',
    },
    './src/store/todoApi.ts': {
      filterEndpoints: [/todo/i],
      exportName: 'todoApi',
    },
  },
  hooks: true,
}

export default config