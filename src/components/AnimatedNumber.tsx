import { useEffect, useState } from 'react';

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  decimalSeparator?: string;
  duration?: number;
  isActive: boolean;
}

export function AnimatedNumber({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  decimalSeparator = ',',
  duration = 1400,
  isActive,
}: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setValue(0);
      return;
    }
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, isActive]);

  const display =
    decimals > 0
      ? value
          .toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
          .replace(/,([^,]*)$/, `${decimalSeparator}$1`)
      : Math.round(value).toLocaleString('pt-BR');

  return (
    <span data-ui="numero-animado">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
