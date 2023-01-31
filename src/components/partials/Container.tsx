export const Container = ({
  children,
  overflow,
}: {
  children: JSX.Element | JSX.Element[];
  overflow?: boolean;
}) => {
  return (
    <main
      className={`container mx-auto ${
        overflow ? "min-h-screen overflow-y-auto" : " h-screen overflow-hidden"
      }`}
    >
      {children}
    </main>
  );
};
