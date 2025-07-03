export default function DescriptionItem({ label, data }) {
  return (
    <div className="grid gap-2">
      <label className="block text-sm font-semibold">{label}</label>
      <p className="text-sm">{data}</p>
    </div>
  );
}
