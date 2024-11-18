import { EffectCallback, useEffect, useRef } from 'react';
import { isEqual } from 'lodash-es';

export default function useDeepCompareEffect(callback: EffectCallback, dependencies: undefined) {
  const currentDependenciesRef = useRef();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}