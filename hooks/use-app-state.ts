import { useState } from "react";

export function useAppState() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return {
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
  };
}