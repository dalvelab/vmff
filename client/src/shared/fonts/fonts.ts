import { Inter, Playfair_Display } from 'next/font/google';

const InterFont = Inter({ subsets: ['cyrillic', 'latin'] });
const PlayfairFont = Playfair_Display({ subsets: ['cyrillic', 'latin'] });

export { InterFont, PlayfairFont };