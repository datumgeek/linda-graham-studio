import { usePortfolioContext } from '../hooks/usePortfolioContext';

export function PortfolioHomePage() {
  const { portfolio } = usePortfolioContext();
  const { description } = portfolio;

  return (
    <div className="prose prose-sm sm:prose-base max-w-3xl">
      <h1 className="font-serif text-2xl sm:text-3xl">{description.title}</h1>
      {description.paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed">{p}</p>
      ))}
    </div>
  );
}
