// @ts-nocheck
import React, { useEffect } from 'react';
import { Space, Button, Radio } from 'antd';
import { useDesigner, TextWidget } from '@designable/react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';
import { useLocalStorage, useSearchParam } from 'react-use';
import { transformToSchema, transformToTreeNode } from '@designable/formily-transformer';

import { loadSchema, saveSchema } from '../service';
import useSchemaKey from '../../../hooks/useSchemaKey';

const LOCALE_MAP = { en: 'en-us', zh: 'zh-cn' };

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  const param = useSearchParam('locale');
  const locale = LOCALE_MAP[param] || 'en-us';
  const [persisted, setPersisted] = useLocalStorage('form-builder-locale', locale);
  const [schemaKey, storage, closeOnSave] = useSchemaKey();

  useEffect(() => {
    loadSchema(schemaKey, storage).then(schema => {
      designer.setCurrentTree(transformToTreeNode(schema));
    });
  }, [schemaKey]);

  const supportLocales = ['zh-cn', 'en-us'];

  useEffect(() => {
    if (param && persisted !== locale) {
      setPersisted(locale);
    }
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('en-us');
    } else {
      GlobalRegistry.setDesignerLanguage(param ? locale : persisted);
    }
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
          setPersisted(e.target.value);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          const schema = transformToSchema(designer.getCurrentTree());
          saveSchema(schemaKey, storage, schema, closeOnSave);
        }}>
        <TextWidget>{closeOnSave ? 'Save & Close' : 'Save'}</TextWidget>
      </Button>
    </Space>
  );
});
