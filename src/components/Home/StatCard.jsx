function StatCard({ label, value, bordered }) {
  return (
    <div
      className={`w-full px-12 ${
        bordered ? "sm:border-r-2 border-zinc-300" : ""
      }`}
    >
      <h3 className="text-2xl font-semibold mb-4 text-center">{label}</h3>
      <p className="text-xl text-center mb-4 text-zinc-500 font-medium">
        {value}
      </p>
    </div>
  );
}

export default StatCard;
