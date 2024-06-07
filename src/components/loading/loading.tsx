type LoadingProps = {
  title: string;
};

function Loading({ title }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] gap-4 select-none">
      <img src="/carrot.svg" alt="" className="w-24 animate-bounce" />
      <p className="text-4xl font-semibold">{title}</p>
    </div>
  );
}

export default Loading;
