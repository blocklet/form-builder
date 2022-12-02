import useSearchParam from 'react-use/lib/useSearchParam';

const DEFAULT_SCHEMA_KEY = 'form-builder-schema';

export default function useSchemaKey(): [string, string, boolean] {
  const schemaKey = useSearchParam('schemaKey') || DEFAULT_SCHEMA_KEY;
  const closeOnSave = !!+useSearchParam('closeOnSave') || false;
  const storage = schemaKey.startsWith('http://') || schemaKey.startsWith('https://') ? 'api' : 'ls';
  return [schemaKey, storage, closeOnSave];
}
