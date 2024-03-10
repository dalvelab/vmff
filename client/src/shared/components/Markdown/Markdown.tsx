import ReactMarkdown from 'react-markdown';

import styles from './styles.module.css';

interface MarkdownProps {
  description: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ description }) => {
  return (
    <ReactMarkdown className={styles.description}>
      {description}
    </ReactMarkdown>
  )
}