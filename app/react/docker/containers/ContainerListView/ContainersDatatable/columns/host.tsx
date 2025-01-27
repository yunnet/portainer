import { Column } from 'react-table';

import type { DockerContainer } from '@/react/docker/containers/types';

export const host: Column<DockerContainer> = {
  Header: 'Host',
  accessor: 'Host',
  id: 'host',
  disableFilters: true,
  canHide: true,
  sortType: 'string',
  Filter: () => null,
};
