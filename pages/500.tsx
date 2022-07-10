import msgsConst from './../utils/constants/msgs.constants';
import Alert from '../components/common/alerts/Alert';

export default function Custom500() {
  return <Alert msgs={msgsConst.errs[500]} />;
}
