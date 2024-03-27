import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from "react"

import { CANONICAL_DOMAIN } from '../constants';

interface SEOProps {
  children: ReactNode;
}

export const SEO: React.FC<SEOProps> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <Head>
      {children}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={CANONICAL_DOMAIN + asPath} />
      <link rel="canonical" href={CANONICAL_DOMAIN + asPath} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:type" content="website" />
    </Head>
  )
}