import { SEO } from '../components/SEO';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-3xl">
      <SEO
        title="About"
        description="Bio and contact information for artist Linda Graham — ceramics, plexiglass, light installations in Denver, CO."
        path="/about"
      />
      {/* Contact Section */}
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Contact</h1>
        <div className="bg-base-200 rounded-xl p-5 sm:p-6">
          <p className="text-base mb-3 font-medium">I would love to hear from you</p>
          <div className="space-y-1 text-sm sm:text-base">
            <p>Linda Graham</p>
            <p>
              <a href="mailto:lgraham938@hotmail.com" className="link link-primary">
                lgraham938@hotmail.com
              </a>
            </p>
            <p>303-829-2295</p>
          </div>
          <div className="mt-4 pt-4 border-t border-base-300 text-sm sm:text-base">
            <p>9260 E. Jewell Circle</p>
            <p>Denver, CO 80231</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Bio Section */}
      <section className="prose prose-sm sm:prose-base max-w-none">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold">Bio and Resume</h1>

        <p>
          Linda Graham earned a Bachelor of Arts degree from Miami University,
          Oxford, Ohio with a major in Biology and a minor in Chemistry in 1960.
        </p>
        <p>
          A year of medical school (1962-3) at Case-Western Reserve University
          was followed by years of childrearing and developing skills and
          knowledge about constructing, glazing and firing works in clay.
        </p>
        <p>
          Her clay work was exhibited in Colorado during the 1980's, while the
          1990's + was spent working to create a youth arts organization in
          Aurora, CO near Colfax Avenue and earning a masters of public
          administration from the University of Colorado Denver in 2001.
        </p>

        <blockquote className="border-l-4 border-primary/40 pl-4 italic opacity-90">
          "In the summer of 1991, I joined a group interested in the creation of
          an arts organization in the Original Aurora area of Aurora. We explored
          the needs of the community as well as possible funding sources. I
          became deeply committed to establishing an organization to involve
          middle school students in this very needful area of the city in the
          making of art for the community. Our first project was a 20' x 60'
          Community Clay Tile Mural. I spent the next 12 years as founding
          director, volunteering when necessary, receiving a salary when
          available, 'making art a part of community life.'"
        </blockquote>

        <p>
          Downtown Aurora Visual Arts, widely known now as DAVA, was
          incorporated as a non-profit organization in 1993 and continues today
          as a vital arts organization under the able directorship of Susan
          Jensen.
        </p>
        <p>
          After exploring some computer based classes in the continuing education
          program at RMCAD (2003-7), Linda found the clay program under Martha
          Russo and continued to help in the clay program while auditing classes
          and exploring fine art options until the fall of 2013. In 2011 she
          discovered the fascinating qualities of plexiglass and has spent 2
          years making sculptures using light and projections to express an
          interest in describing the complexities of our cosmos.
        </p>
        <p>
          Linda now works in her home studio and exhibits at the Ice Cube Gallery
          in Denver.
        </p>

        <h2 className="font-serif">Resume</h2>
        <p>
          <a
            href="http://lindagrahamstudio.com/wp-content/uploads/2013/08/Resume2013.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-primary btn-sm"
          >
            Download Resume (PDF)
          </a>
        </p>
      </section>
    </div>
  );
}
