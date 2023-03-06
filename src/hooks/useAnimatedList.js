import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedRef?.current && !alreadyHasListener) {
        animationEndListeners.current.set(itemId, true);

        animatedRef.current.addEventListener('animationend', () => handleAnimationEnd(itemId));
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) => items.map(
      (item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      },
    ),
    [getAnimatedRef, items, pendingRemovalItemsIds],
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
