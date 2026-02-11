import { usePortfolioContext } from '../hooks/usePortfolioContext';

export function PortfolioHomePage() {
  const { portfolio } = usePortfolioContext();
  const { description } = portfolio;

  return (
    <div className="prose max-w-3xl">
      <h1>{description.title}</h1>
      {description.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
