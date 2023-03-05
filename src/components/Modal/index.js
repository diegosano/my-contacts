import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import * as S from './styles';
import { Button } from '../Button';
import { ReactPortal } from '../ReactPortal';

export function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    let timeoutId;

    if (!visible) {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <S.Overlay isLeaving={!visible}>
        <S.Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <S.Footer>
            <button type="button" className="cancel-button" disabled={isLoading} onClick={onCancel}>
              {cancelLabel}
            </button>

            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </S.Footer>
        </S.Container>
      </S.Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  isLoading: false,
};
