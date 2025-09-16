import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Skeleton
        height={168}
        containerClassName="w-full flex-1 sm:max-w-72 min-w-[244px] shadow"
        className="w-full"
      />
      <Skeleton
        height={168}
        containerClassName="w-full flex-1 sm:max-w-72 min-w-[244px] shadow"
        className="w-full"
      />
      <Skeleton
        height={168}
        containerClassName="w-full flex-1 sm:max-w-72 min-w-[244px] shadow"
        className="w-full"
      />
    </div>
  );
}
