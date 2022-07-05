import { range } from 'lodash';

import PaginationBtn from './PaginationBtn';

type PaginationData = {
  page: number;
  onPageItemClick: any;
  nextBtnDisabled?: boolean;
};

function Pagination(props: PaginationData) {
  const { page: currentPage, onPageItemClick, nextBtnDisabled } = props;

  return (
    <nav
      className='d-flex justify-content-center'
      aria-label='Page navigation example'
    >
      <ul className='pagination'>
        <PaginationBtn
          key='prev-page-btn'
          className={currentPage === 1 ? ' disabled pe-none' : ''}
          page={1}
          content={<span aria-hidden='true'>&laquo;</span>}
          onClick={() => onPageItemClick(currentPage - 1)}
        />
        {range(1, currentPage + 1).map(page => (
          <PaginationBtn
            key={page}
            className={currentPage === page ? ' active' : ''}
            page={page}
            content={page}
            onClick={() => onPageItemClick(page)}
          />
        ))}
        <PaginationBtn
          key='next-page-btn'
          className={
            'next-page-btn' +
            (nextBtnDisabled ?? false ? ' disabled pe-none' : '')
          }
          page={currentPage}
          content={<span aria-hidden='true'>&raquo;</span>}
          onClick={() => onPageItemClick(currentPage + 1)}
        />
      </ul>
    </nav>
  );
}

export default Pagination;
