import PlanetProvider from "../context/PlanetProvider";

function renderWithContext(children: React.ReactNode) {
  return (
    <PlanetProvider>
      {children}
    </PlanetProvider>
  );
}

export default renderWithContext;