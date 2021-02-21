export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`container mx-auto w-screen h-screen flex justify-center items-center overflow-hidden bg-gray-300 bg-opacity-0`}
    >
      {children}
    </div>
  );
}
