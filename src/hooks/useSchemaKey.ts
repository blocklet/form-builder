import useSearchParam from 'react-use/lib/useSearchParam';

const DEFAULT_SCHEMA_KEY = 'form-builder-schema';

export default function useSchemaKey(): [string, boolean] {
  const schemaKey = useSearchParam('schemaKey') || DEFAULT_SCHEMA_KEY;
  return [schemaKey, schemaKey === DEFAULT_SCHEMA_KEY];
}
