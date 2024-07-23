export default function Error({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4 border-2 rounded-lg  border-attention text-attention-foreground shadow-lg p-12">
        <h1 className="font-semibold text-lg ">Error</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
