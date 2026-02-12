export interface PortfolioImage {
  imageCaption?: string;
  videoCaption?: string;
  imageSmall: string;
  imageLarge?: string;
  videoLarge?: string;
}

export interface Portfolio {
  portfolio: string;
  portfolioName: string;
  portfolioImage: string;
  description: PortfolioDescription;
  images: PortfolioImage[];
}

export interface PortfolioDescription {
  title: string;
  venue?: string;
  location?: string;
  year?: number;
  medium?: string;
  artistStatement?: string;
  curatorNote?: { text: string; author: string };
  collaborator?: string;
  paragraphs: string[];
}

export type PortfolioListName = 'exhibitions' | 'workingWithClay';

export const portfolioListLabels: Record<PortfolioListName, string> = {
  exhibitions: 'Exhibitions',
  workingWithClay: 'Working with Clay',
};

export const portfolios: Record<PortfolioListName, Portfolio[]> = {
  exhibitions: [
    {
      portfolio: 'naturalSelection',
      portfolioName: 'NATURAL SELECTION',
      portfolioImage: 'ShowsPromiseWindo-Exhibit-300x200.jpg',
      description: {
        title: 'Natural Selection',
        venue: '"Shows Promise" Window Gallery',
        location: 'Denver International Airport',
        year: 2010,
        medium: 'Clay sculpture',
        artistStatement:
          'The spiral forms bring to mind the morning glory vines, swirling galaxies, hurricanes seen from outer space, molecular structures, and most growing thing that bend and sway in the forest, from the smallest to the largest elements of this world. They are products of my mind, composites of lots of looking at hairy, feathery plants the grow in streams, pods that fall at the end of the growing season, geometric solids and geological layering of many western landscapes.',
        paragraphs: [],
      },
      images: [
        { imageCaption: 'Close Up', imageSmall: 'CloseUp-copy-162x162.jpg', imageLarge: 'CloseUp-copy-501x500.jpg' },
        { imageCaption: 'Garden Gourd', imageSmall: 'Garden-Gourd-copy-162x162.jpg', imageLarge: 'Garden-Gourd-copy-750x500.jpg' },
        { imageCaption: 'Mock Jungle', imageSmall: 'Mock-Jungle-copy-162x162.jpg', imageLarge: 'Mock-Jungle-copy-333x500.jpg' },
        { imageCaption: 'Sex in the Garden', imageSmall: 'Sex-in-the-Garden-copy-162x162.jpg', imageLarge: 'Sex-in-the-Garden-copy-750x500.jpg' },
        { imageCaption: 'Yummy Pink Garden', imageSmall: 'yummy-pink-garden-copy-162x162.jpg', imageLarge: 'yummy-pink-garden-copy-500x500.jpg' },
      ],
    },
    {
      portfolio: 'multiverse3',
      portfolioName: 'MULTIVERSE 3',
      portfolioImage: 'Screen-Shot-2013-08-26-at-10.19.52-AM1-300x200.png',
      description: {
        title: 'Multiverse 3',
        venue: 'Rude Gallery, Rocky Mountain College of Art + Design',
        location: 'Denver, CO',
        year: 2013,
        medium: 'Projection, plexiglass',
        curatorNote: {
          text: "Linda Graham's work has shifted from a focus on sculptural clay work to new media installations that take on a host of materials from projection to plexiglass. These media installations engage with concepts of the microcosm to the macrocosm, from cellular structure to interstellar elements. Multiverse 3 is a projection piece that radically transforms the Rude Gallery into an ungrounded interface, redrafting the room's environments features.",
          author: 'Cortney Stell',
        },
        paragraphs: [],
      },
      images: [
        { imageCaption: 'Multiverse 3', imageSmall: 'Screen-Shot-2013-08-26-at-10.13.54-AM-162x162.png', imageLarge: 'Screen-Shot-2013-08-26-at-10.13.54-AM.png' },
        { videoCaption: 'Multiverse 3', imageSmall: 'video-162x162.png', videoLarge: 'http://content.jwplatform.com/players/RJS7Qcdi-S3u9V5Nq.html' },
      ],
    },
    {
      portfolio: 'electromagneticTransformation',
      portfolioName: 'ELECTROMAGNETIC TRANSFORMATION',
      portfolioImage: 'IceCubeGallery-300x200.jpg',
      description: {
        title: 'Electromagnetic Transformation',
        venue: 'Ice Cube Gallery',
        location: 'Denver, CO',
        year: 2013,
        medium: 'Plexiglass, ultraviolet light, fluorescent materials',
        artistStatement:
          'The pieces of Electromagnetic Transformations explore the fascinating properties of plexiglass when exposed to various light wave lengths. In Multiverse 3, a projection cast onto a bent sheet of yellow plexiglass creates the illusion of three dimensions and shows a change in the wave length when light travels across the curved surface. In Illusive Reality, the fluorescent edges are highlighted when exposed to ultraviolet light that can\'t be seen until the wave length is reduced to the visible range when a photon is released. The almost transparent plexiglass panels reflect and transmit light to create a complexity of images. Evolving Multiverses plays with the nearly invisible panel of plexiglass viewed straight on but with enhanced visual interest in the glowing fluorescent edges.',
        paragraphs: [
          'The advancement of the technology of telescopes and measuring instruments, using different wave lengths to highlight different components, has led to an explosion of information about what the cosmos contains. And what I find in the work I have been making lately is a representation of what I have been pondering: wormholes, multiverses, alternative realities, etc.',
        ],
      },
      images: [
        { videoCaption: 'Multiverse 3', imageSmall: 'video-162x162.png', videoLarge: 'http://content.jwplatform.com/players/RJS7Qcdi-S3u9V5Nq.html' },
        { imageCaption: 'Illusive Reality', imageSmall: 'IllusiveReality2-162x162.jpg', imageLarge: 'IllusiveReality2-333x500.jpg' },
        { imageCaption: 'Evolving Multiverses', imageSmall: 'Evolving-Multiverses-162x162.jpg', imageLarge: 'Evolving-Multiverses-333x500.jpg' },
        { imageCaption: 'Serenity', imageSmall: 'Serenity-162x162.jpg', imageLarge: 'Serenity-333x500.jpg' },
        { imageCaption: 'Reflections Deep Space', imageSmall: 'Reflections-Deep-Space-162x162.jpg', imageLarge: 'Reflections-Deep-Space-333x500.jpg' },
      ],
    },
    {
      portfolio: 'myModernAesthetic',
      portfolioName: 'MY MODERN AESTHETIC',
      portfolioImage: 'GalleryViewFront.jpg',
      description: {
        title: 'My Modern Aesthetic',
        medium: 'Mixed media — acrylic, plexiglass, projection',
        paragraphs: [],
      },
      images: [
        { imageCaption: 'Coney Island', imageSmall: 'ConeyIslandFolder.jpg', imageLarge: 'ConeyIslandCover.jpg' },
        { imageCaption: 'Dualities', imageSmall: 'DualitiesFolder.jpg', imageLarge: 'DualitiesCover.jpg' },
        { imageCaption: 'Euclids Leftovers', imageSmall: 'EuclidsLeftoversFolder.jpg', imageLarge: 'EuclidsLeftoversCover.jpg' },
        { imageCaption: 'Euclids Study', imageSmall: 'EuclidsStudyFolder.jpg', imageLarge: 'EuclidsStudyCover.jpg' },
        { imageCaption: 'Ice', imageSmall: 'IceFolder.jpg', imageLarge: 'IceCover.jpg' },
        { imageCaption: 'Intergalactic Maze', imageSmall: 'IntergalacticMazeFolder.jpg', imageLarge: 'IntergalacticMazeCover.jpg' },
        { imageCaption: 'Negative Spaces', imageSmall: 'NegativeSpacesFolder.jpg', imageLarge: 'NegativeSpacesCover.jpg' },
        { imageCaption: 'Portals', imageSmall: 'PortalsFolder.jpg', imageLarge: 'PortalsCover.jpg' },
        { videoCaption: 'My Modern Aesthetic', imageSmall: 'VideoIcon.jpg', videoLarge: 'http://content.jwplatform.com/players/gxvp9GtL-S3u9V5Nq.html' },
      ],
    },
    {
      portfolio: 'personalPerceptions',
      portfolioName: 'PERSONAL PERCEPTIONS',
      portfolioImage: 'Personal Perceptions front.jpg',
      description: {
        title: 'Personal Perceptions',
        venue: 'Hinterland',
        year: 2014,
        medium: 'Acrylic sheets, projected light, SketchUp animation',
        artistStatement:
          'An animated SketchUp generated video cast onto a bent sheet of yellow acrylic sheet creates the illusion of three dimensions and shows a change in the wave length when light travels across the curved surface. With the addition of green bent acrylic sheet panels in front, the mystery of light and color is enhanced. The interaction of these items creates a mysterious 3-D effect. The mind is free to experience a multitude of ideas.',
        paragraphs: [
          'The exhibit showing at Hinterland, November 13 - December 5, is an installation using acrylic sheets, projected light and a darkened space.',
        ],
      },
      images: [
        { imageCaption: 'PP #1', imageSmall: 'PP1folder.jpg', imageLarge: 'PP1cover.jpg' },
        { imageCaption: 'PP #2', imageSmall: 'PP2folder.jpg', imageLarge: 'PP2cover.jpg' },
        { imageCaption: 'PP #3', imageSmall: 'PP3folder.jpg', imageLarge: 'PP3cover.jpg' },
        { imageCaption: 'PP #4', imageSmall: 'PP4folder.jpg', imageLarge: 'PP4cover.jpg' },
        { imageCaption: 'PP #5', imageSmall: 'PP5folder.jpg', imageLarge: 'PP5cover.jpg' },
        { imageCaption: 'PP #6', imageSmall: 'PP6folder.jpg', imageLarge: 'PP6cover.jpg' },
        { imageCaption: 'PP #7', imageSmall: 'PP7folder.jpg', imageLarge: 'PP7cover.jpg' },
        { imageCaption: 'PP #8', imageSmall: 'PP8folder.jpg', imageLarge: 'PP8cover.jpg' },
        { imageCaption: 'PP #9', imageSmall: 'PP9folder.jpg', imageLarge: 'PP9cover.jpg' },
        { imageCaption: 'PP #10', imageSmall: 'PP10folder.jpg', imageLarge: 'PP10cover.jpg' },
        { imageCaption: 'PP #11', imageSmall: 'PP11folder.jpg', imageLarge: 'PP11cover.jpg' },
        { imageCaption: 'PP #12', imageSmall: 'PP12folder.jpg', imageLarge: 'PP12cover.jpg' },
        { imageCaption: 'PP #13', imageSmall: 'PP13folder.jpg', imageLarge: 'PP13cover.jpg' },
        { imageCaption: 'PP #14', imageSmall: 'PP14folder.jpg', imageLarge: 'PP14cover.jpg' },
        { imageCaption: 'PP #15', imageSmall: 'PP15folder.jpg', imageLarge: 'PP15cover.jpg' },
      ],
    },
    {
      portfolio: 'binaries',
      portfolioName: 'BINARIES',
      portfolioImage: 'BinaryFront.jpg',
      description: {
        title: 'Binaries',
        medium: 'Acrylic objects, sculptural installation',
        collaborator: 'S. Fletcher Graham',
        artistStatement:
          'Binaries is a sculptural collaboration by Linda Melvin Graham and S. Fletcher Graham exploring the paradox of human destruction and advancements. The work expresses the concerns about our current destructive treatment of the planet, and the hopes that advancements in many fields of science and technology will help us overcome many of these difficulties and understand more about ourselves and our place in the cosmos.',
        paragraphs: [
          'This exhibit has three areas of focus, each representing some aspect of this paradox. The colors used in the abstract acrylic objects hanging overhead in the gallery change from somber blacks, blues and purples to more optimistic greens, reds and yellows, as the viewer moves from "Dystopia" representing the grim reality of our dystopian future, to "Resilience" an acrylic depiction of the geological timeline with the 5 previous extinctions plus the one we may be experiencing currently, to the back of the gallery where "Transition" represents a more hopeful future of Homo sapiens as we move toward an intergalactic experience and continue to adapt to the realities of a sustainable existence on the earth.',
        ],
      },
      images: [
        { imageCaption: 'Dystopia', imageSmall: 'DystopiaFolder.jpg', imageLarge: 'DystopiaCover.jpg' },
        { imageCaption: 'Dystopia: Escape', imageSmall: 'DystopiaEscapeFolder.jpg', imageLarge: 'DystopiaEscapeCover.jpg' },
        { imageCaption: 'Dystopia: Fletcher Mural', imageSmall: 'DystopiaFletcherMuralFolder.jpg', imageLarge: 'DystopiaFletcherMuralCover.jpg' },
        { imageCaption: 'Gallery: Binaries Poster', imageSmall: 'GalleryBinariesPosterFolder.png', imageLarge: 'GalleryBinariesPosterCover.png' },
        { imageCaption: 'Gallery: Signage', imageSmall: 'GallerySignageFolder.jpg', imageLarge: 'GallerySignageCover.jpg' },
        { imageCaption: 'Resilience: A', imageSmall: 'ResilienceAFolder.jpg', imageLarge: 'ResilienceACover.jpg' },
        { imageCaption: 'Resilience: B', imageSmall: 'ResilienceBFolder.jpg', imageLarge: 'ResilienceBCover.jpg' },
        { imageCaption: 'Resilience: C', imageSmall: 'ResilienceCFolder.jpg', imageLarge: 'ResilienceCCover.jpg' },
        { imageCaption: 'Transition: Entry', imageSmall: 'TransitionEntryFolder.jpg', imageLarge: 'TransitionEntryCover.jpg' },
        { imageCaption: 'Transition: ScreenShot', imageSmall: 'TransitionScreenShotFolder.png', imageLarge: 'TransitionScreenShotCover.png' },
        { videoCaption: 'Exodus Animation', imageSmall: 'VideoIcon.jpg', videoLarge: 'http://content.jwplatform.com/players/InPrbxuD-S3u9V5Nq.html' },
      ],
    },
  ],
  workingWithClay: [
    {
      portfolio: 'earlyWorks',
      portfolioName: 'EARLY WORKS',
      portfolioImage: 'dusk-300x200.jpg',
      description: {
        title: 'Early Works',
        medium: 'Ceramic — various types of clay',
        artistStatement:
          'These pieces were collectively created over a period of 20 years of exploring the aesthetic, physical, and chemical properties of various types of clay. Some are in the personal collection of the artist.',
        paragraphs: [],
      },
      images: [
        { imageCaption: 'Ancient Warrior', imageSmall: 'AncientWarrior-162x162.jpg', imageLarge: 'AncientWarrior-388x500.jpg' },
        { imageCaption: 'Cylinders', imageSmall: 'Cylinders-162x162.jpg', imageLarge: 'Cylinders-344x500.jpg' },
        { imageCaption: 'Dusk', imageSmall: 'dusk-162x162.jpg', imageLarge: 'dusk-621x500.jpg' },
        { imageCaption: 'Egyption Teapot', imageSmall: 'EgyptionTeapot-162x162.jpg', imageLarge: 'EgyptionTeapot-307x500.jpg' },
        { imageCaption: 'Low Bowl', imageSmall: 'lowBowl-162x162.jpg', imageLarge: 'lowBowl-641x500.jpg' },
        { imageCaption: 'Mike Horn', imageSmall: 'MikesHorn-162x162.jpg', imageLarge: 'MikesHorn-500x500.jpg' },
        { imageCaption: 'Mini Tea Pot', imageSmall: 'MiniTeaPot-162x162.jpg', imageLarge: 'MiniTeaPot-364x500.jpg' },
        { imageCaption: 'P7034994', imageSmall: 'P7034994-162x162.jpg', imageLarge: 'P7034994-375x500.jpg' },
        { imageCaption: 'Planes and Angels Motion', imageSmall: 'Planes-and-Angels-Motion-162x162.jpg', imageLarge: 'Planes-and-Angels-Motion-397x500.jpg' },
        { imageCaption: 'Planes Angle 4', imageSmall: 'PlanesAngle4-162x162.jpg', imageLarge: 'PlanesAngle4-616x500.jpg' },
        { imageCaption: 'Red Horn', imageSmall: 'RedHorn-162x162.jpg', imageLarge: 'RedHorn-224x500.jpg' },
        { imageCaption: 'Segmented', imageSmall: 'Segmented-162x162.jpg', imageLarge: 'Segmented-510x500.jpg' },
        { imageCaption: 'Tall Bowl', imageSmall: 'tallBowl-162x162.jpg', imageLarge: 'tallBowl-650x500.jpg' },
        { imageCaption: 'Tall Short', imageSmall: 'TallShort-162x162.jpg', imageLarge: 'TallShort-379x500.jpg' },
        { imageCaption: 'Three Bowls', imageSmall: 'ThreeBowls-162x162.jpg', imageLarge: 'ThreeBowls-606x500.jpg' },
        { imageCaption: 'Top 6', imageSmall: 'Top-6-162x162.jpg', imageLarge: 'Top-6-396x500.jpg' },
        { imageCaption: 'Top 9', imageSmall: 'Top-9-162x162.jpg', imageLarge: 'Top-9-395x500.jpg' },
        { imageCaption: 'Top 10', imageSmall: 'Top-10-162x162.jpg', imageLarge: 'Top-10-630x500.jpg' },
      ],
    },
    {
      portfolio: 'laterWorks',
      portfolioName: '2007-2011',
      portfolioImage: 'yummy-pink-garden1-300x200.jpg',
      description: {
        title: 'Later Works',
        year: 2011,
        medium: 'Ceramic sculpture — clay',
        artistStatement:
          'These pieces were collectively created over the period from 2007 to 2011.',
        paragraphs: [],
      },
      images: [
        { imageCaption: 'Close Up', imageSmall: 'CloseUp-162x162.jpg', imageLarge: 'CloseUp-501x500.jpg' },
        { imageCaption: 'Garden Gourd', imageSmall: 'Garden-Gourd-162x162.jpg', imageLarge: 'Garden-Gourd-750x500.jpg' },
        { imageCaption: 'Genetic Dispersment', imageSmall: 'genetic-dispersment-162x162.jpg', imageLarge: 'genetic-dispersment-333x500.jpg' },
        { imageCaption: 'Genetic Gems 2 Detail', imageSmall: 'Genetic-Gems-2-Detail-162x162.jpg', imageLarge: 'Genetic-Gems-2-Detail-644x500.jpg' },
        { imageCaption: 'Genetic Gems', imageSmall: 'Genetic-Gems-162x162.jpg', imageLarge: 'Genetic-Gems-638x500.jpg' },
        { imageCaption: 'Gestures', imageSmall: 'Gestures-162x162.jpg', imageLarge: 'Gestures-610x500.jpg' },
        { imageCaption: 'Lyrical Lines 1', imageSmall: 'LyricalLines1-162x162.jpg', imageLarge: 'LyricalLines1-666x500.jpg' },
        { imageCaption: 'Lyrical Lines 2', imageSmall: 'LyricalLines2-162x162.jpg', imageLarge: 'LyricalLines2-666x500.jpg' },
        { imageCaption: 'Mock Jungle', imageSmall: 'Mock-Jungle-162x162.jpg', imageLarge: 'Mock-Jungle-333x500.jpg' },
        { imageCaption: 'Sex in the Garden', imageSmall: 'Sex-in-the-Garden-162x162.jpg', imageLarge: 'Sex-in-the-Garden-750x500.jpg' },
        { imageCaption: 'Whats in a Gene', imageSmall: 'Whats-in-a-Gene-162x162.jpg', imageLarge: 'Whats-in-a-Gene-500x500.jpg' },
        { imageCaption: 'Yummy Pink Garden 1', imageSmall: 'yummy-pink-garden1-162x162.jpg', imageLarge: 'yummy-pink-garden1-500x500.jpg' },
      ],
    },
  ],
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getImageUrl(
  listName: PortfolioListName,
  portfolioKey: string,
  filename: string,
): string {
  return `${BASE}/images/${listName}/${portfolioKey}/${filename}`;
}

export function getPortfolioThumbUrl(
  listName: PortfolioListName,
  portfolioKey: string,
  filename: string,
): string {
  return `${BASE}/images/${listName}/${portfolioKey}/${filename}`;
}

export function findPortfolio(
  listName: PortfolioListName,
  portfolioKey: string,
): Portfolio | undefined {
  return portfolios[listName]?.find((p) => p.portfolio === portfolioKey);
}
