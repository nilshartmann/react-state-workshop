import { useSelector, shallowEqual, useStore, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

export function useAppSelector<R>(fn: (state: RootState) => R) {
  return useSelector(fn);
}

export function useShallowAppSelector<R>(fn: (state: RootState) => R) {
  return useSelector(fn, shallowEqual);
}

export function useAppStore() {
  return useStore<RootState>();
}

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
