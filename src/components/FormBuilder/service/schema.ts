import { Engine } from '@designable/core';
import { transformToSchema, transformToTreeNode } from '@designable/formily-transformer';
import { message } from 'antd';

export const saveSchema = (key: string, designer: Engine, close = false) => {
  localStorage.setItem(key, JSON.stringify(transformToSchema(designer.getCurrentTree())));
  if (close) {
    localStorage.setItem(`${key}.done`, 'true');
    setTimeout(() => {
      const parent = window.self;
      parent.opener = window.self;
      parent.close();
    }, 1000);
  }
  message.success('Save Success');
};

export const loadInitialSchema = (key: string, designer: Engine) => {
  try {
    designer.setCurrentTree(transformToTreeNode(JSON.parse(localStorage.getItem(key))));
  } catch {}
};
