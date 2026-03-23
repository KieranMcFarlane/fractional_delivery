type RichTextProps = {
  html: string;
};

export function RichText({ html }: RichTextProps) {
  return <div className="prose-content text-zinc-700" dangerouslySetInnerHTML={{ __html: html }} />;
}
