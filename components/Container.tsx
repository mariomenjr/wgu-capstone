export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`container w-screen h-screen flex justify-center items-center overflow-hidden`}
    >
      {children}
    </div>
  );
}
