"use client";
import defineAbilityFor from "@/authorization/defineAbility";
import { useCustomClaims } from "@/services/user-services";
import { createContextualCan } from "@casl/react";
import { createContext, useMemo } from "react";

const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export function AbilityProvider({ children }) {
  const { userRole, userSubscription } = useCustomClaims();

  const ability = useMemo(
    () => defineAbilityFor(userRole, userSubscription?.plan),
    [userRole, userSubscription]
  );

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
