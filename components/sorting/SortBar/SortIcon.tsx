function SortIcon({ order }: { order: string }) {
  const iconCSSClass: string =
    order === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill';

  return <i className={iconCSSClass + ' ms-1'}></i>;
}

export default SortIcon;
