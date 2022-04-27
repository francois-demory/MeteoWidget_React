import MeteoWidget from 'src/components/MeteoWidget';

export default function App() {
  return (
    <div className="app">
      <MeteoWidget city="Montpellier" code={34000} />
    </div>
  );
}
