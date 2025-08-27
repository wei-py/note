import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export default (ref: RefObject<HTMLElement>, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};

  const [isEnter, setIsEnter] = useState<boolean>(false);

  // 使用useCallback确保函数引用稳定，并正确设置依赖
  const handleMouseEnter = useCallback(() => {
    onEnter?.();
    setIsEnter(true);
    onChange?.(true);
  }, [onEnter, onChange]);

  const handleMouseLeave = useCallback(() => {
    onLeave?.();
    setIsEnter(false);
    onChange?.(false);
  }, [onLeave, onChange]);

  useEffect(() => {
    const element = ref.current;

    element?.addEventListener?.("mouseenter", handleMouseEnter);
    element?.addEventListener?.("mouseleave", handleMouseLeave);

    // 返回清理函数，移除事件监听器
    return () => {
      element?.removeEventListener?.("mouseenter", handleMouseEnter);
      element?.removeEventListener?.("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseEnter, handleMouseLeave]);

  return isEnter;
};
