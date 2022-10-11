// @ts-nocheck
import React, { useEffect } from 'react';
import { Space, Button, Radio } from 'antd';
import { useDesigner, TextWidget } from '@designable/react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';
import useSchemaKey from '../../../hooks/useSchemaKey';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  const [schemaKey, isDefaultSchemaKey] = useSchemaKey();

  useEffect(() => {
    loadInitialSchema(schemaKey, designer);
  }, []);

  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];

  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
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
          { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
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
