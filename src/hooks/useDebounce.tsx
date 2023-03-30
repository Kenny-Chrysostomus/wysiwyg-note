import { useState, useEffect } from "react";

/*
  1.debouncedValueの初期値は引数で渡されたvalue
  2.valueが更新されてtimerが走る
  3.delay時間が経つ前にvalue更新
  4.clearTimeoutによって前のtimerキャンセル
  5.コンポーネントがアップデートされてまたtimerが走る
  6.delay時間が経つまでvalueの更新がない
  7.debouncedValueリターン
 */
export function useDebounce(value:string, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 次の effect が実行される直前に timer キャンセル
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
