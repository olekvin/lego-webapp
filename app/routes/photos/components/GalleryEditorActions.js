// @flow

import React from 'react';
import { Flex } from 'app/components/Layout';
import { Collapse } from 'react-collapse';
import Sticky from 'react-stickynode';
import styles from './Overview.css';
import Button from 'app/components/Button';

type Props = {
  selectedCount: number,
  newPicutureStatus: number,
  onDeselect: () => void,
  onUpdateGalleryCover: () => void,
  onTogglePicturesStatus: (boolean) => void,
  onDeletePictures: () => void,
};

const GalleryEditorActions = ({
  selectedCount,
  onUpdateGalleryCover,
  onDeselect,
  onTogglePicturesStatus,
  onDeletePictures,
  newPicutureStatus,
}: Props) => (
  <Collapse isOpened={selectedCount > 0}>
    <Sticky enabled={selectedCount > 0} innerZ={10} top={0}>
      <Flex className={styles.actionsContainer}>
        <Flex className={styles.actionBar}>
          <div className={styles.selectedElements}>{selectedCount} valgt</div>
          <div>
            {selectedCount === 1 && (
              <Button className={styles.action} onClick={onUpdateGalleryCover}>
                Sett album cover
              </Button>
            )}
            {newPicutureStatus !== -1 && (
              <Button
                onClick={() => onTogglePicturesStatus(!!newPicutureStatus)}
                className={styles.action}
              >
                {newPicutureStatus === 0 && 'Skjul'}
                {newPicutureStatus === 1 && 'Synligjør'}
              </Button>
            )}
            <Button onClick={onDeletePictures} className={styles.action}>
              Slett
            </Button>
            <Button onClick={onDeselect}>Avbryt</Button>
          </div>
        </Flex>
      </Flex>
    </Sticky>
  </Collapse>
);

export default GalleryEditorActions;
