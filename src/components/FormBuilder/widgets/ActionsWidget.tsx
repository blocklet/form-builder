// @ts-nocheck
import React, { useEffect } from 'react';
import { Space, Button, Radio } from 'antd';
import { useDesigner, TextWidget } from '@designable/react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';
import { useLocalStorage, useSearchParam } from 'react-use';

import { loadInitialSchema, saveSchema } from '../service';
import useSchemaKey from '../../../hooks/useSchemaKey';

const LOCALE_MAP = { en: 'en-us', zh: 'zh-cn' };

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  const param = useSearchParam('locale');
  const locale = LOCALE_MAP[param] || 'en-us';
  const [persisted, setPersisted] = useLocalStorage('form-builder-locale', locale);
  const [schemaKey, isDefaultSchemaKey] = useSchemaKey();

  useEffect(() => {
    loadInitialSchema(schemaKey, designer);
  }, []);

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
          saveSchema(schemaKey, designer, !isDefaultSchemaKey);
        }}>
        <TextWidget>{isDefaultSchemaKey ? 'Save' : 'Save & Close'}</TextWidget>
      </Button>
    </Space>
  );
});
