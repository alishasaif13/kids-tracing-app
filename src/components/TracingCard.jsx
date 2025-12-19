export default function TracingCard({ title, icon, onClick, colorClass }) {
  return (
    <div
      onClick={onClick}
      className={`group relative h-52 flex flex-col items-center justify-center 
                 bg-gradient-to-b ${colorClass} text-white rounded-3xl shadow-xl 
                 transform transition-all duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-2xl active:scale-95 cursor-pointer 
                 border-b-8 border-black/20`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-6xl font-black drop-shadow-lg mb-3 transform group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="text-2xl font-bold tracking-wide drop-shadow-md">
        {title}
      </span>
      <div className="mt-2 w-12 h-1.5 bg-white/40 rounded-full group-hover:w-20 transition-all" />
    </div>
  );
}
