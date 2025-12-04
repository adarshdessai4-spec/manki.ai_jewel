import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const SectionWrapper = ({ id, className = "", children }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={`py-14 sm:py-18 ${className}`.trim()}
    >
      <div className="w-full space-y-6">{children}</div>
    </section>
  );
};

export default SectionWrapper;
