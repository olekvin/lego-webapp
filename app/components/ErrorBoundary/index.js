// @flow
import * as React from 'react';
import * as Sentry from '@sentry/browser';
import styles from './ErrorBoundary.css';
import awSnap from 'app/assets/sentry-aw-snap.svg';
import { Image } from 'app/components/Image';

type Props = {
  openReportDialog?: boolean,
  children: any,
  hidden?: boolean,
  /* Reset error when this prop changes */
  resetOnChange?: any,
};

type State = {
  error: ?Error,
  lastEventId: ?string,
};

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    error: null,
    lastEventId: null,
  };

  openDialog = () => {
    this.state.lastEventId &&
      Sentry.showReportDialog({
        eventId: this.state.lastEventId,
        lang: 'no',
        title: 'Det skjedde en feil :(',
        subtitle: 'Webkom har fått beskjed.',
        subtitle2:
          'Gjerne beskriv hva som skjedde, så kan vi fikse problemet kjappere.',
      });
  };

  // eslint-disable-next-line
  componentWillReceiveProps(nextProps: Props) {
    const { resetOnChange } = this.props;
    const { error } = this.state;
    if (error && nextProps.resetOnChange !== resetOnChange) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: Object) {
    this.setState({ error });
    if (__DEV__) {
      /* eslint no-console: 0 */
      console.error(error);
      /* eslint no-console: 0 */
      console.error(errorInfo);
    }
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const lastEventId = Sentry.captureException(error);
      this.setState({ lastEventId }, () => {
        this.props.openReportDialog && this.openDialog();
      });
    });
  }

  render() {
    const { openReportDialog, hidden = false, children, ...rest } = this.props;

    if (!this.state.error) {
      return React.Children.map(children, (child) =>
        React.cloneElement(child, { ...rest })
      );
    }
    if (hidden) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div
          className={styles.snap}
          onClick={() => !openReportDialog && this.openDialog()}
        >
          <Image src={awSnap} alt="snap" />
          <div className={styles.message}>
            <h3>En feil har oppstått</h3>
            <p>Webkom har fått beskjed om feilen.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
