type CounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
};

function format(value: number, decimals: number) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

/** Counts up once when it enters the viewport (ScrollEffects). HTML already holds the final value. */
export function Counter({ value, decimals = 0, suffix = "", prefix = "", duration = 1.6, delay = 0, className }: CounterProps) {
  const final = `${prefix}${format(value, decimals)}${suffix}`;
  return (
    <span className={className}>
      <span
        aria-hidden
        className="tabular"
        data-count={value}
        data-decimals={decimals}
        data-prefix={prefix}
        data-suffix={suffix}
        data-duration={duration}
        data-delay={delay}
      >
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
