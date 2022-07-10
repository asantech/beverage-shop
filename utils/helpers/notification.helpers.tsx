import * as rootElementsHelpers from 'utils/helpers/rootElements.helpers';

import Toast from 'components/common/toasts/Toast';

interface ToastProps {
  role?: 'success' | 'alert';
  msgs: string;
}

export function showToast(props: ToastProps) {
  const { role, msgs } = props;
  rootElementsHelpers
    .getRootElement('toastsContainer')
    .render(<Toast role={role ?? 'alert'} msgs={msgs} />);
}
