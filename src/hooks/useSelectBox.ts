import { useState } from 'react';

// selectbox 상태관리 Hook
const useSelectBox = (
  init: string
): [string, (e: React.ChangeEvent<HTMLSelectElement>) => void, (value: string) => void] => {
  const [select, setSelect] = useState<string>(init);

  const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const onChange = (value: string) => {
    setSelect(value);
  };

  return [select, handle, onChange];
};

export default useSelectBox;
