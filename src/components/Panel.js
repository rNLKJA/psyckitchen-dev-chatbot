export function Panel({ children }) {
  return (
    <div className="flex flex-col items-center justify-center p-4rounded-xl mx-12 h-80vh">
      {children}
    </div>
  );
}
