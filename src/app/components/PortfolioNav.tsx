import { NavLink, useParams } from 'react-router-dom';

export function PortfolioNav() {
  const { listName, portfolioKey } = useParams<{
    listName: string;
    portfolioKey: string;
  }>();

  const base = `/portfolio/${listName}/${portfolioKey}`;

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <NavLink
        to={base}
        end
        className={({ isActive }) =>
          `btn btn-sm sm:btn-md ${isActive ? 'btn-primary' : 'btn-ghost'} min-h-[2.5rem]`
        }
        title="Grid"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="hidden sm:inline text-xs">Grid</span>
      </NavLink>
      <NavLink
        to={`${base}/carousel/0`}
        className={({ isActive }) =>
          `btn btn-sm sm:btn-md ${isActive ? 'btn-primary' : 'btn-ghost'} min-h-[2.5rem]`
        }
        title="Slideshow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline text-xs">Slideshow</span>
      </NavLink>
      <NavLink
        to={`${base}/info`}
        className={({ isActive }) =>
          `btn btn-sm sm:btn-md ${isActive ? 'btn-primary' : 'btn-ghost'} min-h-[2.5rem]`
        }
        title="Info"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="hidden sm:inline text-xs">Info</span>
      </NavLink>
    </div>
  );
}
