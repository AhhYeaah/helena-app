import { LoadingSpinner } from "./LoadingSpinner";

export function LoadingScreen() {
  return (
    <div className="flex justify-center items-center absolute h-screen w-screen bg-white top-0 left-0 slow-fade-out">
      <LoadingSpinner></LoadingSpinner>
    </div>
  );
}
