export default function SectionBadge({ children }) {
  return (
    <span className="text-sm text-gray-600 font-bold bg-primary/10 border-2 border-primary rounded-full py-1 px-3 shadow-md w-fit">
      {children}
    </span>
  );
}
