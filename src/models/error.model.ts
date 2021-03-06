export interface ErrorResponseBody {
  error: string;
  message: string;
  details: string;
}

export const authorizationFailure : ErrorResponseBody = {
  error: 'Auth-fail',
  message: 'Failed to authenticate api-key',
  details: 'Server api access is secured and requires the correct api-key. '
  + 'If you are the owner of this server please cycle your keys to update, '
  + 'otherwise please contact your server administrator for further '
  + 'instructions.'
}

export const timerUninitializedResponse : ErrorResponseBody = {
  error:'api-timer-uninitialized',
  message:'The internal server timer has not been updated',
  details: 'Please start a timer via one of the supported applications to '
  + 'update the system timer first before requesting updates.'
};

export const timerAlreadyPaused : ErrorResponseBody = {
  error: 'api-timer-doublepause',
  message: 'The internal timer has already been paused',
  details: 'Please update the local configuration to acknowledge the timer has '
  + 'already been paused.'
};

export const timerAlreadyUnpaused : ErrorResponseBody = {
  error: 'api-timer-doubleunpause',
  message: 'The internal timer is already unpaused',
  details: `Please update the local configuration to acknowledge the timer has '
  + 'already been unpaused.`
}
