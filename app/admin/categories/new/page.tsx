import CategoryForm from '@/components/admin/categories/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">カテゴリ作成</h1>
      <CategoryForm />
    </div>
  );
}
