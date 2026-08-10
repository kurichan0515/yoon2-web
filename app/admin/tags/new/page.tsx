import TagForm from '@/components/admin/tags/TagForm';

export default function NewTagPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">タグ作成</h1>
      <TagForm />
    </div>
  );
}
