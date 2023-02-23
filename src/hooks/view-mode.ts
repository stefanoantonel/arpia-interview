import { useSearchParams } from 'next/navigation';

import { ViewStateType } from '@/types';
import { viewQueryParam } from '@/constants';

export default function useViewMode() {
  const params = useSearchParams();

  const viewParam: ViewStateType | null = params.get(viewQueryParam) as ViewStateType;
  let currentView: ViewStateType = 'GRID';
  if (viewParam) {
    currentView = viewParam;
  }
  return currentView;
}
