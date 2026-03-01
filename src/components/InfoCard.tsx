type CardBaseProps = {
  className?: string;
  children: React.ReactNode;
};

export const InfoCard = ({ className, children }: CardBaseProps) => {
  return <div className={`infoCard ${className}`.trim()}>{children}</div>;
};
