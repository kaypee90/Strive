import { PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeEvery } from 'redux-saga/effects';
import * as coreHub from 'src/core-hub';
import { closeConference, openConference } from 'src/core-hub';
import { EquipmentErrorDto, RequestDisconnectDto, SyncStatePayload } from 'src/core-hub.types';
import { kickedError, newSessionConnectedError } from 'src/errors';
import { showMessage } from 'src/store/notifier/actions';
import { showErrorOn, showLoadingHubAction } from 'src/store/notifier/utils';
import { takeEverySynchronizedObjectInitialization } from 'src/store/saga-utils';
import { close, onEventOccurred } from 'src/store/signal/actions';
import { CONFERENCE, SynchronizedConferenceInfo } from 'src/store/signal/synchronization/synchronized-object-ids';
import { formatErrorMessage } from 'src/utils/error-utils';
import { selectMyParticipantId } from '../auth/selectors';
import { setConnectionError, setSidebarOpen } from './reducer';

function* onRequestDisconnect(action: PayloadAction<RequestDisconnectDto>) {
   yield put(close());
   switch (action.payload.reason) {
      case 'byModerator':
         yield put(setConnectionError(kickedError()));
         break;
      case 'newSessionConnected':
         yield put(setConnectionError(newSessionConnectedError()));
         break;
      default:
         break;
   }
}

function* onEquipmentError(action: PayloadAction<EquipmentErrorDto>) {
   yield put(showMessage({ type: 'error', message: formatErrorMessage(action.payload.error) }));
}

function* onSyncConferenceInitialized({ payload: { value } }: PayloadAction<SyncStatePayload>) {
   const syncConference = value as SynchronizedConferenceInfo;
   const participantId: string | null = yield select(selectMyParticipantId);

   if (participantId && syncConference.moderators.includes(participantId)) {
      yield put(setSidebarOpen(false));
   }
}

export default function* mySaga() {
   yield showErrorOn(openConference.returnAction);
   yield showErrorOn(closeConference.returnAction);
   yield showLoadingHubAction(coreHub.fetchPermissions, 'Fetch permissions...');

   yield takeEvery(onEventOccurred(coreHub.events.onRequestDisconnect), onRequestDisconnect);
   yield takeEvery(onEventOccurred(coreHub.events.onEquipmentError), onEquipmentError);

   yield takeEverySynchronizedObjectInitialization(CONFERENCE, onSyncConferenceInitialized);
}
