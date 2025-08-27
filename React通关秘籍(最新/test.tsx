import dayjs from "dayjs";

import { useEffect, useMemo, useRef, useState } from "react";

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

function calcLeft(target?: TDate) {
  if (!target) {
    return 0;
  }

  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
}

function parseMs(milliseconds: number): FormattedRes {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
}

function useCountdown(options: Options = {}) {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const memoLeftTime = useMemo<TDate>(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  const target = "leftTime" in options ? memoLeftTime : targetDate;

  // 初始状态可以直接在 useState 中计算
  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    // 如果没有目标，直接设置时间为0并退出
    if (!target) {
      setTimeLeft(0);
      return;
    }

    // 🌟 解决问题的核心：移除直接的 setTimeLeft 调用
    // 而是立即调用一次更新，并设置定时器
    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);

      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    // 在 useEffect 清理函数中清除定时器
    return () => clearInterval(timer);
  }, [target, interval]); // 依赖项保持不变

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
}

export default useCountdown;
