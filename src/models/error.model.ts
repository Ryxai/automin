export interface ErrorResponse {
  error: string;
  message: string;
  details: string;
}

export const timerUninitializedResponse : ErrorResponse = {
  error:'api-timer-uninitialized',
  message:'The internal server timer has not been updated',
  details: 'Please start a timer via one of the supported applications to update the system timer first before requesting updates. If you have started a timer, please'
      + 'ensure that the webhook\'s headers are properly configured to utilize the "Origin-Request" header appropriately.' 
};
