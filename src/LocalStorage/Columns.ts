import get from 'lodash/get';

const STORAGE_KEY = 'raColumnsConfig';

// Very basic storage helper
// values are stored in browser localStorage

const getRootValue = () => {
  try {
    return JSON.parse(<string>window.localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    return undefined;
  }
};

const setRootValue = (value: any) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
  }
};

const Columns = {
  get(key: string) {
    return get(getRootValue(), key);
  },
  set(key: string, value: any) {
    const oldValue = getRootValue();
    setRootValue({
      ...oldValue,
      [key]: value,
    });
  },
};

export default Columns;
