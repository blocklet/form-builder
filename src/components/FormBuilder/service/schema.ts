import axios from 'axios';
import { message } from 'antd';
import isVarName from 'is-var-name';
import { IFormilySchema } from '@designable/formily-transformer';

const api = axios.create({ timeout: 8000 });

export const saveSchema = async (key: string, storage: string, schema: IFormilySchema, close = false) => {
  const { properties } = schema.schema;
  const assertPropertyName = x => {
    if (isVarName(x.name) === false) {
      throw new Error(`You must specify a valid field name for "${x.title}", current: "${x.name}"`);
    }
  }

  try {
    Object.keys(properties).forEach(key => {
      assertPropertyName(properties[key]);
      if (typeof properties[key].properties === 'object') {
        Object.keys(properties[key].properties).forEach(k => {
          assertPropertyName(properties[key].properties[k]);
        });
      }
    });
  } catch (err) {
    message.error(err.message, 5);
    return;
  }

  if (storage === 'ls') {
    localStorage.setItem(key, JSON.stringify(schema));
    if (close) {
      localStorage.setItem(`${key}.done`, 'true');
    }
  } else if (storage === 'api') {
    await api.put(key, schema);
  }

  if (close) {
    setTimeout(() => {
      const parent = window.self;
      parent.opener = window.self;
      parent.close();
    }, 1000);
  }

  message.success('Form saved successfully');
};

export const loadSchema = async (key: string, storage: string) => {
  try {
    if (storage === 'ls') {
      return JSON.parse(localStorage.getItem(key));
    } else if (storage === 'api') {
      const { data } = await api.get(key);
      return typeof data === 'object' ? data : {};
    }
  } catch (err) {
    console.error(err);
    return {};
  }
};
