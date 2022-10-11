import { Engine } from '@designable/core';
import { transformToSchema, transformToTreeNode } from '@designable/formily-transformer';
import { message } from 'antd';

export const saveSchema = (key: string, designer: Engine) => {
  localStorage.setItem(key, JSON.stringify(transformToSchema(designer.getCurrentTree())));
  message.success('Save Success');
};

export const loadInitialSchema = (key: string, designer: Engine) => {
  try {
    designer.setCurrentTree(transformToTreeNode(JSON.parse(localStorage.getItem(key))));
  } catch {}
};
