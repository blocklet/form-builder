import axios from 'axios';
import { message } from 'antd';

export const saveSchema = async (key: string, storage: string, schema: any, close = false) => {
  if (storage === 'ls') {
    localStorage.setItem(key, JSON.stringify(schema));
    if (close) {
      localStorage.setItem(`${key}.done`, 'true');
    }
  } else if (storage === 'api') {
    await axios.post(key, schema);
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
      const { data } = await axios.get(key,);
      return typeof data === 'object' ? data : {};
    }
  } catch (err) {
    console.error(err);
    return {};
  }
};
