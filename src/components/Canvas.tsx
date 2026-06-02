export default function Canvas() {
  return (
    <div className="mt-5 flex justify-center p-4">
      <canvas
        width={800}
        height={600}
        className="w-full max-w-6xl bg-white border border-black"
      />
    </div>
  );
}
