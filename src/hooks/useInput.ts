import { useState } from 'react';

// input type Date 상태관리 Hook
const useInput = (init: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(init);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handle];
};

export default useInput;
