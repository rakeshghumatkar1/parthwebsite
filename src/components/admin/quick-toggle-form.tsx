type QuickToggleFormProps = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  field: string;
  value: boolean;
  label: string;
};

export function QuickToggleForm({
  action,
  id,
  field,
  value,
  label,
}: QuickToggleFormProps) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name={field} value={String(!value)} />
      <button
        type="submit"
        className="text-xs font-medium text-tb-blue hover:underline"
      >
        {label}
      </button>
    </form>
  );
}
