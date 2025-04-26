"use client";

import { PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/lib/store";

function StoreProvider(props: PropsWithChildren) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
}

export default StoreProvider;
