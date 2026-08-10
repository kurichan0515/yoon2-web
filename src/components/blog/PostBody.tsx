interface Props {
  html: string;
}

export default function PostBody({ html }: Props) {
  return (
    <div
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
